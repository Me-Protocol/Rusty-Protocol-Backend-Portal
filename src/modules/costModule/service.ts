import { HttpException, Injectable } from '@nestjs/common';
import { CostModuleService } from '@src/globalServices/costManagement/costModule.service';
import { PaymentRequestService } from '@src/globalServices/costManagement/paymentRequestProcessors.service';
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
import { TransactionsType } from '@src/utils/enums/Transactions';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { PaymentOrigin } from '@src/utils/enums/PaymentOrigin';
import { SettingsService } from '@src/globalServices/settings/settings.service';
import { FiatWalletService } from '@src/globalServices/fiatWallet/fiatWallet.service';
import { CostBatch } from '@src/globalServices/costManagement/entities/costBatch.entity';
import { logger } from '@src/globalServices/logger/logger.service';

@Injectable()
export class CostModuleManagementService {
  constructor(
    private readonly costModuleService: CostModuleService,
    private readonly paymentRequestService: PaymentRequestService,
    private readonly brandService: BrandService,
    private readonly paymentService: PaymentService,
    private readonly walletService: FiatWalletService,
    private readonly settingsService: SettingsService,
  ) {}

  async setAutoTopUpAmount(amount: number, brand: Brand) {
    brand.autoTopupAmount = amount;

    await this.brandService.save(brand);

    return 'ok';
  }

  async createPaymentRequestApi(body: PaymentRequestDto) {
    try {
      const { minimumBalanceApi } =
        await this.settingsService.getCostSettings();

      const brand = await this.brandService.getBrandById(body.brandId);
      const wallet = await this.walletService.getWalletByBrandId(body.brandId);

      if (!brand.canPayCost || wallet.balance < minimumBalanceApi) {
        throw new HttpException("Brand can't pay cost", 400, {});
      }

      return await this.createPaymentRequest(body, PaymentOrigin.API);

      // Create payment request
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400, {});
    }
  }

  async createPaymentRequestInApp(body: PaymentRequestDto) {
    try {
      const { minimumBalanceInApp } =
        await this.settingsService.getCostSettings();

      const brand = await this.brandService.getBrandById(body.brandId);
      const wallet = await this.walletService.getWalletByBrandId(body.brandId);

      if (!brand.canPayCost_inApp || wallet.balance < minimumBalanceInApp) {
        throw new HttpException("Brand can't pay cost", 400, {});
      }

      return await this.createPaymentRequest(body, PaymentOrigin.IN_APP);

      // Create payment request
    } catch (error) {
      logger.error(error);
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

        const status =
          await this.costModuleService.checkTransactionStatusWithRetry({
            taskId: relayResponse.taskId,
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
      logger.error(error);
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

      if (requests?.length !== 0) {
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

            if (totalCost && totalCostInDollar && tokenSymbol) {
              request.costAmountInToken = totalCost;
              request.costAmountInDollar = totalCostInDollar;
              request.costCurrency = 'dollar';
              request.tokenSymbol = tokenSymbol;
            }
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

        await this.costReimburser(activeBatch);
      }

      return true;
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

  // @Cron(CronExpression.EVERY_30_SECONDS)
  async costReimburser(batch?: CostBatch) {
    // Runs every minute (Picks all closed batchs, picks all the requests that has not been paid,agrregate the cos, debit brands balance and reimburse us if necessary)

    try {
      let singleClosedBatch: CostBatch;

      if (batch) {
        singleClosedBatch = batch;
      } else {
        singleClosedBatch =
          await this.costModuleService.getSingleClosedCostBatch();
      }

      if (!singleClosedBatch) {
        return true;
      }

      const requests =
        await this.paymentRequestService.getCostBatchPaymentRequests(
          singleClosedBatch.id,
        );

      const paidRequests = [];

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

        let wallet = await this.walletService.getWalletByBrandId(brandId);

        // Debit brand account with total cost
        const paidCost = await this.walletService.minusBrandBalance({
          fiatWallet: wallet,
          amount: totalCost,
          transactionType: TransactionsType.DEBIT,
          narration: 'Cost Reimbursement',
        });

        // Create cost collection
        if (paidCost) {
          const costCollection = new CostCollection();
          costCollection.brandId = brandId;
          costCollection.totalCost = totalCost;
          costCollection.costBatchId = singleClosedBatch.id;

          // Update all requests with status paid
          for (let index = 0; index < brandRequests.length; index++) {
            const request = brandRequests[index];

            request.isCostPaid = true;

            await this.paymentRequestService.save(request);
            paidRequests.push(request);
          }
        }
      }

      if (paidRequests?.length === requests?.length) {
        singleClosedBatch.isPaid = true;
        await this.costModuleService.save(singleClosedBatch);
      } else {
        singleClosedBatch.reimburserFailed = true;
        await this.costModuleService.save(singleClosedBatch);
      }

      return true;
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async costReimburserRetry() {
    const closedFailedBatch =
      await this.costModuleService.getSingleFailedCostBatch();

    if (closedFailedBatch) {
      await this.costReimburser(closedFailedBatch);
    }
  }

  @Cron('0 0 1 */30 *')
  async brandBalanceAutoTopup() {
    const brands = await this.brandService.getAllBrands();

    for (let index = 0; index < brands.length; index++) {
      const brand = brands[index];
      const wallet = await this.walletService.getWalletByBrandId(brand.id);

      try {
        await this.walletService.fundBrandAccountForCostCollection(
          wallet,
          brand,
        );
      } catch (error) {
        logger.error(error);
      }
    }

    return true;
  }

  async manualTopUp(brandId: string, amount: number) {
    const brand = await this.brandService.getBrandById(brandId);
    const wallet = await this.walletService.getWalletByBrandId(brandId);

    const defaultPaymentMethod =
      await this.paymentService.getDefaultPaymentMethod(wallet.id);

    try {
      if (!defaultPaymentMethod?.stripePaymentMethodId) {
        throw new HttpException('Please link your card first.', 400, {});
      }

      return await this.walletService.fundBrandAccountForCostCollection(
        wallet,
        brand,
        amount,
      );
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400, {});
    }
  }
}
