import {
  Controller,
  Body,
  UseInterceptors,
  UseGuards,
  ValidationPipe,
  Put,
  Post,
  Param,
  Get,
  Query,
  Req,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ResponseInterceptor } from '@src/interceptors/response.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { RewardManagementService } from './service';
import { CreateRewardDto } from './dto/createRewardDto.dto';
import { BrandJwtStrategy } from '@src/middlewares/brand-jwt-strategy.middleware';
import { UpdateRewardDto } from './dto/updateRewardDto';
import { FilterRewardDto } from './dto/filterRewardDto.dto';
import { UpdateBatchDto } from './dto/updateBatchDto';
import { GetCustomerPointDto } from './dto/getCustomerPointDto.dto';
import {
  DistributeBatchDto,
  DistributeBatchWithApiKeyDto,
} from './dto/distributeBatch.dto';
import { SpendRewardDto } from './dto/spendRewardDto.dto';
import { InAppApiKeyJwtStrategy } from '@src/middlewares/inapp-api-jwt-strategy.middleware';
import { SyncRewardService } from '@src/globalServices/reward/sync/sync.service';
import { ApiKeyJwtStrategy } from '@src/middlewares/api-jwt-strategy.middleware';
import { ApiKey } from '@src/globalServices/api_key/entities/api_key.entity';
import { PushTransactionDto } from './dto/PushTransactionDto.dto';
import { ServerGuard } from '@src/middlewares/server-guard';
import { FilterRegistryHistoryDto } from './dto/filterRegistryHistoryDto.dto';

@ApiTags('Reward')
@UseInterceptors(ResponseInterceptor)
@Controller('reward')
export class RewardManagementController {
  constructor(
    private readonly rewardManagementService: RewardManagementService,
    private readonly syncService: SyncRewardService,
  ) {}

  @UseGuards(BrandJwtStrategy)
  @Post()
  async createReward(
    @Body(ValidationPipe) createRewardDto: CreateRewardDto,
    @Req() req: any,
  ) {
    const brandId = req.user.brand.id;
    createRewardDto.brandId = brandId;

    return await this.rewardManagementService.createReward(createRewardDto);
  }

  @UseGuards(ApiKeyJwtStrategy)
  @Post('api_key')
  async createRewardUseApiKey(
    @Body(ValidationPipe) createRewardDto: CreateRewardDto,
    @Req() req: any,
  ) {
    const brandId = req.user.brand.id;
    createRewardDto.brandId = brandId;
    const apiKey = req.apiKey as ApiKey;
    createRewardDto.apiKey = apiKey.protocolPublicKey;

    return await this.rewardManagementService.createReward(createRewardDto);
  }

  // @UseGuards(BrandJwtStrategy)
  // @Put(':rewardId')
  // async updateReward(
  //   @Body(ValidationPipe) body: UpdateRewardDto,
  //   @Param('rewardId') rewardId: string,
  //   @Req() req: any,
  // ) {
  //   const brandId = req.user.brand.id;
  //   body.brandId = brandId;
  //   return await this.rewardManagementService.updateReward(rewardId, body);
  // }

  @UseGuards(BrandJwtStrategy)
  @Delete(':rewardId')
  async deleteReward(@Param('rewardId') rewardId: string, @Req() req: any) {
    const brandId = req.user.brand.id;
    return await this.rewardManagementService.deleteReward(rewardId, brandId);
  }

  @UseGuards(BrandJwtStrategy)
  @Get('brand/:rewardId')
  async getRewardBrand(@Param('rewardId') rewardId: string, @Req() req: any) {
    const brandId = req.user.brand.id;
    return await this.rewardManagementService.getRewardBrand(rewardId, brandId);
  }

  @UseGuards(AuthGuard())
  @Get(':rewardId')
  async getReward(@Param('rewardId') rewardId: string) {
    return await this.rewardManagementService.getReward(rewardId);
  }

  @UseGuards(AuthGuard())
  @Get()
  async getRewards(@Query(ValidationPipe) query: FilterRewardDto) {
    return await this.rewardManagementService.getRewards(query);
  }

  @UseGuards(AuthGuard())
  @Get('contract/:contractAddress')
  async getRewardByContractAddress(@Param('contractAddress') param: string) {
    return await this.rewardManagementService.getRewardByContractAddress(param);
  }

  // @UseGuards(BrandJwtStrategy)
  // @Post('batch')
  // async createBatch(@Body(ValidationPipe) body: AddBatchDto, @Req() req: any) {
  //   return await this.categoryManagementService.createBatch(body);
  // }

  @UseGuards(BrandJwtStrategy)
  @Post('add-reward-points')
  async updateBatch(
    @Body(ValidationPipe) body: UpdateBatchDto,
    @Req() req: any,
  ) {
    const brandId = req.user.brand.id;
    body.brandId = brandId;

    return await this.rewardManagementService.updateBatch(body);
  }

  @UseGuards(ApiKeyJwtStrategy)
  @Post('issue-reward')
  async issueReward(
    @Body(ValidationPipe) body: UpdateBatchDto,
    @Req() req: any,
  ) {
    const brandId = req.brand.id;
    body.brandId = brandId;

    return await this.rewardManagementService.updateBatch(body);
  }

  @UseGuards(BrandJwtStrategy)
  @Get('batch/:batchId')
  async getBatch(@Param('batchId') batchId: string, @Req() req: any) {
    const brandId = req.user.brand.id;

    return await this.rewardManagementService.getBatch(batchId, brandId);
  }

  @UseGuards(BrandJwtStrategy)
  @Get('batch')
  async getBatches(@Req() req: any, @Query() query: FilterRewardDto) {
    const brandId = req.user.brand.id;
    query.brandId = brandId;

    return await this.rewardManagementService.getBatches(query);
  }

  @UseGuards(BrandJwtStrategy)
  @Get('pre-distribute/:rewardId')
  async preDistributeBatch(
    @Req() req: any,
    @Param('rewardId') rewardId: string,
  ) {
    const brandId = req.user.brand.id;

    return await this.rewardManagementService.getBatchUserWalletsAndAmount(
      brandId,
      rewardId,
    );
  }

  @UseGuards(BrandJwtStrategy)
  @Post('distribute')
  async distributeBatch(
    @Req() req: any,
    @Body(ValidationPipe) body: DistributeBatchDto,
  ) {
    const brandId = req.user.brand.id;

    return await this.rewardManagementService.distributeBatch(brandId, body);
  }

  @UseGuards(ApiKeyJwtStrategy)
  @Post('distribute/:rewardId')
  async distributeWithApiKey(
    @Req() req: any,
    @Param('rewardId', ParseUUIDPipe) rewardId: string,
    @Body(ValidationPipe) body: DistributeBatchWithApiKeyDto,
  ) {
    const apiKey = req.apiKey as ApiKey;
    body.rewardId = rewardId;

    return await this.rewardManagementService.distributeWithApiKey(
      apiKey,
      body.rewardId,
    );
  }

  @UseGuards(InAppApiKeyJwtStrategy)
  @UseGuards(ServerGuard)
  @Post('push-transaction')
  async spendReward(
    @Req() req: any,
    @Body(ValidationPipe) body: PushTransactionDto,
  ) {
    return await this.syncService.pushTransactionToRuntime(body.params);
  }

  @UseGuards(BrandJwtStrategy)
  @Post('registry/syncedCustomer')
  async getRegistryByIdentifer(
    @Req() req: any,
    @Query(ValidationPipe) query: GetCustomerPointDto,
  ) {
    return await this.rewardManagementService.getRegistryByIdentifer(
      query.identifier,
      query.rewardId,
    );
  }

  @UseGuards(AuthGuard())
  @Get('registry')
  async getRegistry(
    @Query(ValidationPipe) query: FilterRegistryHistoryDto,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    query.userId = userId;

    return await this.rewardManagementService.getRegistryHistory(query);
  }
}
