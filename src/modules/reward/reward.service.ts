import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRewardDto } from './dto/create-reward.dto';
import { RewardsEntity } from './models/rewards.entity';
import { v4 as uuidV4 } from 'uuid';
import slugify from 'slugify';
import { TokenrewardService } from '../tokenreward/tokenreward.service';
import { TokenReward } from '../tokenreward/models/tokenreward.entity';
import { ElasticIndex } from '../search/index/search.index';
import { BrandService } from '@src/globalServices/brand/brand.service';

@Injectable()
export class RewardsService {
  constructor(
    private readonly brandService: BrandService,
    private readonly tokenRewardService: TokenrewardService,
    private readonly elasticIndex: ElasticIndex,

    @InjectRepository(RewardsEntity)
    private readonly rewardsRepo: Repository<RewardsEntity>,
  ) {}

  /**
   * create a reward
   * @param body
   * @returns
   */
  // async createRecord(body: CreateRewardDto, user: User): Promise<any> {
  //   try {
  //     //TODO: check if brand exits

  //     //TODO: check if brand is verified

  //     //TODO: trim body and sanitize

  //     // console.log(body);

  //     if (body.rewardType === RewardType.REGULARPOINTS) {
  //       if (
  //         !body.brandName ||
  //         !body.description ||
  //         !body.rewardSymbol ||
  //         !body.rewardType ||
  //         !body.rewardName ||
  //         !body.syncApiAddress ||
  //         !body.syncApiAccessToken ||
  //         !body.syncApiRefreshToken ||
  //         !body.oidcDiscoveryAddress
  //       )
  //         throw new HttpException(
  //           'Please select required fields',
  //           HttpStatus.BAD_REQUEST,
  //         );
  //     } else {
  //       if (
  //         !body.brandName ||
  //         !body.description ||
  //         !body.rewardSymbol ||
  //         !body.rewardType ||
  //         !body.rewardName ||
  //         !body.contractAddress ||
  //         !body.blockchain
  //       )
  //         throw new HttpException(
  //           'Please select required fields',
  //           HttpStatus.BAD_REQUEST,
  //         );
  //     }

  //     // console.log(user);

  //     //check if brand exits
  //     const brand = await this.brandService.findOneBrandByPrimaryContactUserId(
  //       user.id,
  //     );
  //     if (!brand)
  //       throw new HttpException('Brand does not exists', HttpStatus.NOT_FOUND);

  //     let newReward: RewardsEntity;

  //     if (RewardType.REGULARPOINTS === body.rewardType) {
  //       //check if reward label does exists
  //       const reward = await this.findOneRewardByLabel(body.rewardSymbol);
  //       if (reward && reward.rewardType === body.rewardType)
  //         throw new HttpException(
  //           'Reward Label already exists for this brand',
  //           HttpStatus.BAD_REQUEST,
  //         );

  //       //check if reward name exists in points rewards
  //       const rewardPoint = await this.pointRewardService.findOneRewardByName(
  //         body.rewardName,
  //       );
  //       if (rewardPoint)
  //         throw new HttpException(
  //           'Reward with reward name already exists for this brand',
  //           HttpStatus.BAD_REQUEST,
  //         );

  //       newReward = await this.create({
  //         brandId: brand.id,
  //         rewardSymbol: body.rewardSymbol,
  //         rewardImage: body.rewardImage,
  //         slug: slugify(body.rewardName).toLowerCase(),
  //         brandName: brand.brandName,
  //         rewardId: uuidV4(),
  //         rewardType: body.rewardType,
  //         autoSyncEnabled: false,
  //         rewardName: body.rewardName,
  //         description: body.description,
  //       });

  //       const newRegularPoint = await this.pointRewardService.create({
  //         pointsrewardId: uuidV4(),
  //         rewardId: newReward.id,
  //         rewardName: body.rewardName,
  //         rewardNameSlug: slugify(body.rewardName).toLowerCase(),
  //         brandName: brand.brandName,
  //         syncApiAddress: body.syncApiAddress,
  //         syncApiAccessToken: body.syncApiAccessToken,
  //         syncApiRefreshToken: body.syncApiRefreshToken,
  //         description: body.description,
  //       });

  //       return { data: newRegularPoint };
  //     } else if (RewardType.TOKEN === body.rewardType) {
  //       //check if reward name exists in token rewards
  //       const rewardToken = await this.tokenRewardService.findOneByName(
  //         body.rewardName,
  //       );

  //       if (rewardToken)
  //         throw new HttpException(
  //           'Reward with token already exists for this brand',
  //           HttpStatus.BAD_REQUEST,
  //         );

  //       const rewardTokenContract =
  //         await this.tokenRewardService.findTokenByContractAddress(
  //           body.contractAddress,
  //         );

  //       if (rewardTokenContract)
  //         throw new HttpException(
  //           'Reward with contract already exists for this brand',
  //           HttpStatus.BAD_REQUEST,
  //         );

  //       newReward = await this.create({
  //         brandId: brand.id,
  //         rewardSymbol: body.rewardSymbol,
  //         rewardImage: body.rewardImage,
  //         slug: slugify(body.rewardName).toLowerCase(),
  //         brandName: brand.brandName,
  //         rewardId: uuidV4(),
  //         rewardType: body.rewardType,
  //         autoSyncEnabled: false,
  //         rewardName: body.rewardName,
  //         description: body.description,
  //       });

  //       const newToken = new TokenReward();
  //       newToken.tokenRewardId = uuidV4();
  //       newToken.rewardId = newReward.id;
  //       newToken.brandName = brand.brandName;
  //       newToken.rewardName = body.rewardName;
  //       newToken.contractAddress = body.contractAddress;
  //       newToken.symbol = body.rewardSymbol;
  //       newToken.blockchain = body.blockchain;

  //       const newTokenReward = await this.tokenRewardService.createToken(
  //         newToken,
  //       );

  //       return { data: newTokenReward };
  //     }

  //     const reward = await this.findOneById(newReward.id);
  //     this.elasticIndex.insertDocument(reward, rewardIndex);

  //     return true;
  //   } catch (error) {
  //     console.log(error);
  //     throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  /**
   *
   * @param reward
   * @returns RewardsEntity
   */
  // async create(reward: CreateRewardDto): Promise<RewardsEntity> {
  //   const newReward: Reward = new RewardsEntity();
  //   newReward.rewardId = uuidV4();
  //   newReward.brandId = reward.brandId;
  //   newReward.rewardSymbol = reward.rewardSymbol;
  //   newReward.rewardImage = reward.rewardImage;
  //   newReward.slug = reward.slug;
  //   newReward.brandName = reward.brandName;
  //   newReward.rewardType = reward.rewardType;
  //   newReward.autoSyncEnabled = reward.autoSyncEnabled;
  //   newReward.rewardName = reward.rewardName;
  //   newReward.description = reward.description;

  //   return this.rewardsRepo.save(newReward);
  // }

  // /**
  //  *
  //  * @param reward
  //  * @returns RewardsEntity
  //  */
  // async update(
  //   reward: CreateRewardDto,
  //   id: string,
  //   userId: string,
  // ): Promise<RewardsEntity> {
  //   try {
  //     const newReward = await this.rewardsRepo.findOne({
  //       where: {
  //         id: id,
  //         brand: {
  //           primaryContactUserId: userId,
  //         },
  //       },
  //     });

  //     if (!newReward) {
  //       throw new HttpException('Reward not found', HttpStatus.NOT_FOUND);
  //     }

  //     newReward.description = reward.description;
  //     newReward.rewardImage = reward.rewardImage;
  //     newReward.rewardSymbol = reward.rewardSymbol;
  //     newReward.rewardName = reward.rewardName;
  //     // newReward.rewardType = reward.rewardType;
  //     newReward.slug = reward?.slug
  //       ? slugify(reward.rewardName).toLowerCase()
  //       : newReward.slug;

  //     if (reward.rewardType === RewardType.REGULARPOINTS) {
  //       // if (!newReward.pointReward.id) {
  //       //   throw new HttpException("Point not found", )
  //       // }

  //       await this.pointRewardService.update(newReward.id, {
  //         rewardName: reward.rewardName,
  //         rewardNameSlug: reward.rewardName
  //           ? slugify(reward.rewardName).toLowerCase()
  //           : newReward.slug,
  //         syncApiAddress: reward.syncApiAddress,
  //         syncApiAccessToken: reward.syncApiAccessToken,
  //         syncApiRefreshToken: reward.syncApiRefreshToken,
  //       });
  //     }

  //     if (reward.rewardType === RewardType.TOKEN) {
  //       await this.tokenRewardService.updateToken(newReward.id, {
  //         rewardName: reward.rewardName,
  //         contractAddress: reward.contractAddress,
  //         symbol: reward.rewardSymbol,
  //         isBounty: reward.isBounty,
  //         blockchain: reward.blockchain,
  //       });
  //     }

  //     const rewardE = await this.rewardsRepo.save(newReward);

  //     this.elasticIndex.updateDocument(rewardE, rewardIndex);

  //     return rewardE;
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  // /**
  //  * gets all the rewards
  //  * @returns RewardsEntity[]
  //  */
  // async findAll(
  //   category_id: number,
  //   brand_id: string,
  //   reward_type: RewardType,
  // ): Promise<RewardsEntity[]> {
  //   return this.rewardsRepo.find({
  //     where: {
  //       brand: {
  //         categories: {
  //           id: category_id,
  //         },
  //         id: brand_id,
  //       },
  //       rewardType: reward_type,
  //     },
  //     relations: ['brand', 'pointReward', 'tokenReward'],
  //     select: {
  //       pointReward: {
  //         id: true,
  //         rewardId: true,
  //         rewardName: true,
  //         brandName: true,
  //       },
  //     },
  //   });
  // }

  // /**
  //  * get a reward by label
  //  * @param label
  //  * @returns RewardsEntity
  //  */
  // async findOneRewardByLabel(label: string): Promise<RewardsEntity> {
  //   const rewardSlug = slugify(label).toLowerCase();
  //   return this.rewardsRepo.findOneBy({ slug: rewardSlug });
  // }

  // /**
  //  * delete a reward
  //  * @param rewardId
  //  * @returns boolean
  //  */
  // async delete(rewardId: string): Promise<boolean> {
  //   await this.rewardsRepo.delete({ id: rewardId });

  //   this.elasticIndex.deleteDocument(rewardIndex, Number(rewardId));

  //   return true;
  // }

  // async addHandleToReward(reward: PointsReward): Promise<any> {
  //   //
  // }

  // async findOneById(id: any): Promise<RewardsEntity> {
  //   return this.rewardsRepo.findOneBy({ id: id });
  // }
}
