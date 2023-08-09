import { HttpException, Injectable } from '@nestjs/common';
import { CostModuleService } from '@src/globalServices/costManagement/costModule.service';
import { PaymentRequestService } from '@src/globalServices/costManagement/paymentProcessors.service';
import { PaymentRequestDto } from './dto/PaymentRequestDto.dto';
import { PaymentRequestTnxType } from '@src/utils/enums/PaymentRequestTnxType';
import { PaymentRequest } from '@src/globalServices/costManagement/entities/paymentRequest.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BrandService } from '@src/globalServices/brand/brand.service';
import { CostCollection } from '@src/globalServices/costManagement/entities/costCollection';
import { supportedNetworks } from '@src/globalServices/costManagement/symbol-finder.service';
import retrieveCost from '@src/globalServices/costManagement/relayer-costgetter.service';
import { GelatoRelay } from '@gelatonetwork/relay-sdk';
import axios from 'axios';
import { PaymentService } from '../../globalServices/fiatWallet/payment.service';
import { WalletService } from '@src/globalServices/fiatWallet/wallet.service';
import { TransactionsType } from '@src/utils/enums/Transactions';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { FiatWallet } from '@src/globalServices/fiatWallet/entities/fiatWallet.entity';
import { PaymentOrigin } from '@src/utils/enums/PaymentOrigin';

// Convert the amount to cents
// amount = amount * 100;

const minimumBalanceApi = 500;
const minimumBalanceInApp = 100;
const percentageDiff = 4;

let amount = (minimumBalanceApi + minimumBalanceInApp) * percentageDiff;
console.log(amount);

@Injectable()
export class CostModuleManagementService {
  constructor(
    private readonly costModuleService: CostModuleService,
    private readonly paymentRequestService: PaymentRequestService,
    private readonly brandService: BrandService,
    private readonly paymentService: PaymentService,
    private readonly walletService: WalletService,
  ) {}

  async checkTransactionStatusWithRetry({
    attempt,
    taskId,
  }: {
    taskId: string;
    attempt?: number;
  }): Promise<string> {
    const apiUrl = process.env.GELATO_RELAYER_STATUS_URL + taskId;

    try {
      const response = await axios.get(apiUrl);
      const status = response.data.task.taskState;

      return status;
    } catch (error) {
      throw new Error('Failed to check transaction status.');
    }
  }

  async createPaymentRequestApi(body: PaymentRequestDto) {
    try {
      const brand = await this.brandService.getBrandById(body.brandId);
      const wallet = await this.walletService.getWalletByBrandId(body.brandId);

      if (!brand.canPayCost || wallet.balance < minimumBalanceApi) {
        throw new HttpException("Brand can't pay cost", 400, {});
      }

      return await this.createPaymentRequest(body, PaymentOrigin.API);

      // Create payment request
    } catch (error) {
      throw new HttpException(error.message, 400, {});
    }
  }

  async createPaymentRequestInApp(body: PaymentRequestDto) {
    try {
      const brand = await this.brandService.getBrandById(body.brandId);
      const wallet = await this.walletService.getWalletByBrandId(body.brandId);

      if (!brand.canPayCost_inApp || wallet.balance < minimumBalanceInApp) {
        throw new HttpException("Brand can't pay cost", 400, {});
      }

      return await this.createPaymentRequest(body, PaymentOrigin.IN_APP);

      // Create payment request
    } catch (error) {
      throw new HttpException(error.message, 400, {});
    }
  }

  async createPaymentRequest(body: PaymentRequestDto, origin: PaymentOrigin) {
    try {
      // check if network is supported
      const supportedNetworksArray = Object.values(supportedNetworks);

      if (!supportedNetworksArray.includes(body.network)) {
        throw new HttpException('Network not supported', 400, {});
      }

      const activeBatch =
        await this.costModuleService.getOrCreateActiveCostBatch();

      const req = new PaymentRequest();
      req.brandId = body.brandId;
      req.narration = body.narration;
      req.costBatchId = activeBatch.id;
      req.network = body.network;
      req.relayerType = 'gelato';
      req.data = body.data;
      req.signature = body.signature;
      req.tnxType = body.tnxType;
      req.origin = origin;

      if (body.tnxType === PaymentRequestTnxType.RELAYER) {
        // Query the relayer processor

        const relay = new GelatoRelay();

        const struct = body.data;

        const relayResponse = await relay.sponsoredCallERC2771WithSignature(
          struct,
          body.signature,
          process.env.GELATO_API_KEY,
        );

        // check task id for status

        const url =
          process.env.GELATO_RELAYER_STATUS_URL + relayResponse.taskId;
        const gelatoResponse = await axios.get(url);
        const transactionHash = gelatoResponse.data;

        console.log(transactionHash);

        const status = await this.checkTransactionStatusWithRetry({
          taskId: relayResponse.taskId,
          attempt: 1,
        });

        req.sourceReference = relayResponse.taskId;
        await this.paymentRequestService.save(req);

        if (status === 'CheckPending') {
          return {
            success: true,
            message:
              'Transaction status is not yet available. Please check back later.',
            status,
            taskId: relayResponse.taskId,
          };
        }

        return {
          success: true,
          status,
          taskId: relayResponse.taskId,
          message: 'Transaction is complete',
        };
      } else {
        // Query the runtime processor

        req.sourceReference = 'relayResponse.taskId';
        await this.paymentRequestService.save(req);
      }

      // Create payment request
    } catch (error) {
      throw new HttpException(error.message, 400, {});
    }
  }

  async getPaymentRequests(brandId: string, page: number) {
    return await this.paymentRequestService.getPaymentRequests(
      brandId,
      page,
      10,
    );
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async costCollector() {
    // Runs every 4 hours (picks all the requests in the active batch and sends to the processor to get cost) update requests with cost and close batch

    try {
      const activeBatch =
        await this.costModuleService.getOrCreateActiveCostBatch();

      const requests =
        await this.paymentRequestService.getCostBatchPaymentRequests(
          activeBatch.id,
        );

      if (requests.length !== 0) {
        for (let index = 0; index < requests.length; index++) {
          const request = requests[index];

          if (request.tnxType === PaymentRequestTnxType.RELAYER) {
            // Query the relayer processor

            const { totalCost, totalCostInDollar, tokenSymbol } =
              await retrieveCost(
                request.sourceReference,
                request.relayerType,
                request.network,
              );

            request.costAmountInToken = totalCost;
            request.costAmountInDollar = totalCostInDollar;
            request.costCurrency = 'dollar';
            request.tokenSymbol = tokenSymbol;
          } else {
            // Query the runtime processor
            request.costAmountInToken = 100;
            request.costAmountInDollar = 100;
            request.costCurrency = 'dollar';
            request.tokenSymbol = 'MATIC';
          }

          await this.paymentRequestService.save(request);
        }

        activeBatch.isClosed = true;
        await this.costModuleService.save(activeBatch);

        await this.costModuleService.getOrCreateActiveCostBatch();
      }

      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async costReimburser() {
    // Runs every minute (Picks all closed batchs, picks all the requests that has not been paid,agrregate the cos, debit brands balance and reimburse us if necessary)

    const singleClosedBatch =
      await this.costModuleService.getSingleClosedCostBatch();

    if (!singleClosedBatch) {
      return true;
    }

    const requests =
      await this.paymentRequestService.getCostBatchPaymentRequests(
        singleClosedBatch.id,
      );

    // pick all brandIds in each request without repetition

    const brandIds = requests.map((request) => request.brandId);
    const uniqueBrandIds = [...new Set(brandIds)];

    // for each brandId, get all requests and aggregate the cost

    for (let index = 0; index < uniqueBrandIds.length; index++) {
      const brandId = uniqueBrandIds[index];

      const brandRequests = requests.filter(
        (request) => request.brandId === brandId,
      );

      // IN DOLLAR!!!
      const totalCost = brandRequests.reduce(
        (acc, curr) => acc + curr.costAmountInDollar,
        0,
      );

      let brand = await this.brandService.getBrandById(brandId);
      let wallet = await this.walletService.getWalletByBrandId(brandId);

      if (wallet.balance < totalCost) {
        // try to fund brand account
        await this.fundBrandAccountForCostCollection(wallet, brand);
      }

      // Debit brand account with total cost
      await this.walletService.minusBrandBalance({
        brand,
        amount: totalCost,
        transactionType: TransactionsType.DEBIT,
        narration: 'Cost Reimbursement',
      });

      brand = await this.brandService.getBrandById(brandId);
      wallet = await this.walletService.getWalletByBrandId(brandId);

      // Create cost collection
      const costCollection = new CostCollection();
      costCollection.brandId = brandId;
      costCollection.totalCost = totalCost;
      costCollection.costBatchId = singleClosedBatch.id;

      // Update all requests with status paid
      for (let index = 0; index < brandRequests.length; index++) {
        const request = brandRequests[index];

        request.isCostPaid = true;

        await this.paymentRequestService.save(request);
      }

      // Check if brand has enough balance to pay for cost next time

      // 4 * minimumBalance
      const minimumBalanceForNextBatch =
        (minimumBalanceApi + minimumBalanceInApp) * 4;

      if (wallet.balance < minimumBalanceForNextBatch) {
        await this.fundBrandAccountForCostCollection(wallet, brand);
      } else {
        brand.canPayCost = true;

        await this.brandService.save(brand);
      }
    }

    return true;
  }

  @Cron(
    // every 30 days
    '0 0 1 */30 *',
  )
  async brandBalanceAutoTopup() {
    const brands = await this.brandService.getAllBrands();

    for (let index = 0; index < brands.length; index++) {
      const brand = brands[index];
      const wallet = await this.walletService.getWalletByBrandId(brand.id);

      try {
        this.fundBrandAccountForCostCollection(wallet, brand);
      } catch (error) {
        console.log(error);
      }
    }

    return true;
  }

  async fundBrandAccountForCostCollection(wallet: FiatWallet, brand: Brand) {
    // try to charge brand card

    const defaultPaymentMethod =
      await this.paymentService.getDefaultPaymentMethod(wallet.id);

    if (defaultPaymentMethod.stripePaymentMethodId) {
      try {
        // Create a payment intent to charge the user's card
        const paymentIntent =
          await this.paymentService.createAutoCardChargePaymentIntent(
            defaultPaymentMethod.stripePaymentMethodId,
            amount,
            wallet.stripeCustomerId,
          );

        // Confirm the payment intent (this will automatically attempt the charge on the user's card)
        await this.paymentService.confirmPaymentIntent(paymentIntent.id);

        // add to brand balance
        await this.walletService.addBrandBalance({
          brand,
          amount,
          transactionType: TransactionsType.CREDIT,
          narration: 'Cost Reimbursement',
        });

        brand.canPayCost = true;
        brand.canPayCost_inApp = true;

        await this.brandService.save(brand);
      } catch (error) {
        brand.canPayCost = false;
        brand.canPayCost_inApp = false;

        await this.brandService.save(brand);
      }
    } else {
      brand.canPayCost = false;
      brand.canPayCost_inApp = false;

      await this.brandService.save(brand);
    }
  }

  async manualTopUp(brandId: string) {
    const brand = await this.brandService.getBrandById(brandId);
    const wallet = await this.walletService.getWalletByBrandId(brandId);

    try {
      return await this.fundBrandAccountForCostCollection(wallet, brand);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400, {});
    }
  }
}
