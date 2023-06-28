import {
  Controller,
  Post,
  UseGuards,
  Res,
  Body,
  Request,
  Get,
  Query,
  Put,
  Param,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RewardsService } from './reward.service';
import { RewardsEntity } from './models/rewards.entity';
import { RewardType } from './interfaces/reward.inteface';

@ApiTags('rewards')
@Controller('rewards')
export class RewardsController {
  constructor(private readonly rewardService: RewardsService) {}

  /**
   * Creates a reward type
   * @param body
   * @param res
   * @param req
   * @returns
   */
  @ApiResponse({
    description: 'Creates a reward type ',
    status: 200,
    type: RewardsEntity,
  })
  @ApiResponse({ status: 400, description: 'Return Errors' })
  @ApiResponse({
    status: 500,
    description:
      'Unknown error or Likely thrown if no access token is in header',
  })
  @Post('create')
  async createReward(@Body() body: any): Promise<any> {
    // const user = req.user;
    // await this.rewardService.createRecord(body, user);
    // return res.status(200).send({ msg: 'Reward is created' });
  }

  @Put('update/:id')
  async updateReward(
    @Body() body: any,
    @Param() params: { id: string },
  ): Promise<any> {
    // const user = req.user;
    // await this.rewardService.update(body, params.id, user.id);
    // return res.status(200).send({ msg: 'Reward updated' });
  }

  @ApiResponse({
    description: 'Return all rewards',
    status: 200,
    type: RewardsEntity,
  })
  @ApiResponse({ status: 400, description: 'Return Errors' })
  @ApiResponse({
    status: 500,
    description:
      'Unknown error or Likely thrown if no access token is in header',
  })
  @Get('all')
  async findAll(
    @Query()
    query: {
      category_id: number;
      brand_id: string;
      reward_type: RewardType;
    },
  ): Promise<any> {
    // const rewards = await this.rewardService.findAll(
    //   query.category_id,
    //   query.brand_id,
    //   query.reward_type,
    // );
    // return res.status(200).send({ rewards });
  }
}
