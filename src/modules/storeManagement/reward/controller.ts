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
} from '@nestjs/common';
import { ResponseInterceptor } from '@src/interceptors/response.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { RewardManagementService } from './service';
import { CreateRewardDto } from './dto/createRewardDto.dto';
import { BrandJwtStrategy } from '@src/middlewares/brand-jwt-strategy.middleware';
import { UpdateRewardDto } from './dto/updateRewardDto';
import { FilterRewardDto } from './dto/filterRewardDto.dto';
import { AddBatchDto } from './dto/addBatchDto.dto';
import { UpdateBatchDto } from './dto/updateBatchDto';
import { GetCustomerPointDto } from './dto/getCustomerPointDto.dto';

@ApiTags('Reward')
@UseInterceptors(ResponseInterceptor)
@Controller('reward')
export class RewardManagementController {
  constructor(
    private readonly rewardManagementService: RewardManagementService,
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

  @UseGuards(BrandJwtStrategy)
  @Put(':rewardId')
  async updateReward(
    @Body(ValidationPipe) body: UpdateRewardDto,
    @Param('rewardId') rewardId: string,
    @Req() req: any,
  ) {
    const brandId = req.user.brand.id;
    body.brandId = brandId;
    return await this.rewardManagementService.updateReward(rewardId, body);
  }

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
  @Post('distribute/:rewardId')
  async distributeBatch(@Req() req: any, @Param('rewardId') rewardId: string) {
    const brandId = req.user.brand.id;

    return await this.rewardManagementService.distributeBatch(
      brandId,
      rewardId,
    );
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
}
