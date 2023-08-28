import { HttpException, Injectable } from '@nestjs/common';
import { BrandService } from '@src/globalServices/brand/brand.service';
import { FollowService } from '@src/globalServices/follow/follow.service';
import { UserService } from '@src/globalServices/user/user.service';
import { FollowDto } from './dto/FollowDto.dto';
import { FilteUserFollowDto, FilterFollowDto } from './dto/FilterFollowDto.dto';
import { logger } from '@src/globalServices/logger/logger.service';

@Injectable()
export class FollowManagementService {
  constructor(
    private readonly followService: FollowService,
    private readonly brandService: BrandService,
    private readonly userService: UserService,
  ) {}

  async followBrand(body: FollowDto) {
    try {
      const brand = await this.brandService.getBrandById(body.brandId);

      if (!brand) {
        throw new Error('Brand not found');
      }

      const alreadyFollowed = await this.followService.checkIfFollowing(
        brand.id,
        body.userId,
      );

      if (alreadyFollowed) {
        throw new Error('Already followed');
      }

      return await this.followService.followBrand(brand.id, body.userId);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.status, {
        cause: error,
      });
    }
  }

  async unfollowBrand(body: FollowDto) {
    try {
      const brand = await this.brandService.getBrandById(body.brandId);

      if (!brand) {
        throw new Error('Brand not found');
      }

      const alreadyFollowed = await this.followService.checkIfFollowing(
        brand.id,
        body.userId,
      );

      if (!alreadyFollowed) {
        throw new Error('Not following');
      }

      return await this.followService.unfollow(brand.id, body.userId);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.status, {
        cause: error,
      });
    }
  }

  async getBrandsFollowers(query: FilterFollowDto) {
    try {
      const brand = await this.brandService.getBrandById(query.brandId);

      if (!brand) {
        throw new Error('Brand not found');
      }

      return await this.followService.getBrandsFollowers(
        query.brandId,
        query.page,
        query.limit,
      );
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.status, {
        cause: error,
      });
    }
  }

  async getUserFollowedBrands(query: FilteUserFollowDto) {
    try {
      const user = await this.userService.getUserById(query.userId);

      if (!user) {
        throw new Error('User not found');
      }

      return await this.followService.getUsersFollowing(
        query.userId,
        query.page,
        query.limit,
      );
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.status, {
        cause: error,
      });
    }
  }

  async checkIfFollowing(brandId: string, userId: string) {
    return await this.followService.checkIfFollowing(brandId, userId);
  }
}
