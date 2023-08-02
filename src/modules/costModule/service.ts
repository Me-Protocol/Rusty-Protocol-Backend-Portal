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
import { CostBatch } from '@src/globalServices/costManagement/entities/costBatch.entity';

const maxAttempts = 1;
const delayBetweenAttempts = 5000; // 5 seconds

@Injectable()
export class CostModuleManagementService {
  constructor(
    private readonly costModuleService: CostModuleService,
    private readonly paymentRequestService: PaymentRequestService,
    private readonly brandService: BrandService,
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

  async createPaymentRequest(body: PaymentRequestDto) {
    try {
      const brand = await this.brandService.getBrandById(body.brandId);

      if (!brand.canPayCost) {
        throw new HttpException("Brand can't pay cost", 400, {});
      }

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

        if (status === 'CheckPending') {
          return {
            success: true,
            message:
              'Transaction status is not yet available. Please check back later.',
            status,
            taskId: relayResponse.taskId,
          };
        }

        req.sourceReference = relayResponse.taskId;
        await this.paymentRequestService.save(req);

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
      await this.costModuleService.createCostBatch(activeBatch);

      const newBatch = new CostBatch();

      await this.costModuleService.createCostBatch(newBatch);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async costReimburser() {
    // Runs every minute (Picks all closed batchs, picks all the requests that has not been paid, aggregate the cost and send to the processor to get cost) update requests

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

      // Debit brand account with total cost

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

      const hasEnoughBalance = true;

      // If not, send notification to brand admin
      const brand = await this.brandService.getBrandById(brandId);

      if (hasEnoughBalance) {
        brand.canPayCost = true;

        await this.brandService.save(brand);
      } else {
        brand.canPayCost = false;

        await this.brandService.save(brand);
      }
    }

    return true;
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async brandBalanceChecker() {
    // Runs every minute (Picks all brands that has canPayCost as false, check if they have enough balance to pay for cost) update brand.canPayCost
  }
}
