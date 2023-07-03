import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from './entities/follow.entity';
import { BrandService } from '../brand/brand.service';

@Injectable()
export class FollowerService {
  constructor(
    @InjectRepository(Follow)
    private readonly followerRepository: Repository<Follow>,

    private readonly brandService: BrandService,
  ) {}

  // get brands followers
  async getBrandsFollowers(brandId: string): Promise<Follow[]> {
    const followers = await this.followerRepository.find({
      where: {
        brandId,
      },
      relations: ['user', 'user.customer'],
      select: {
        user: {
          username: true,
          customer: {
            name: true,
            profilePicture: true,
          },
        },
      },
    });

    return followers;
  }

  // follow brand
  async followBrand(brandId: string, userId: string): Promise<any> {
    const following = this.followerRepository.create({
      brandId,
      userId,
    });

    await this.followerRepository.save(following);

    const brand = await this.brandService.getBrandById(userId);
    brand.followersCount += 1;

    await this.brandService.save(brand);

    return following;
  }

  // delete follower
  async unfollow(userId: string, brandId: string): Promise<string> {
    await this.followerRepository.delete({
      userId,
      brandId,
    });

    const brand = await this.brandService.getBrandById(userId);
    brand.followersCount -= 1;

    await this.brandService.save(brand);

    return 'ok';
  }

  // check if user is following brand
  async checkIfFollowing(brandId: string, userId: string): Promise<boolean> {
    const following = await this.followerRepository.findOne({
      where: {
        brandId,
        userId,
      },
      relations: ['user', 'user.customer'],
      select: {
        user: {
          username: true,
          customer: {
            name: true,
            profilePicture: true,
          },
        },
      },
    });

    return !!following;
  }

  // get users following
  async getUsersFollowing(userId: string): Promise<Follow[]> {
    const following = await this.followerRepository.find({
      where: {
        userId,
      },
      relations: ['user', 'user.customer'],
      select: {
        user: {
          username: true,
          customer: {
            name: true,
            profilePicture: true,
          },
        },
      },
    });

    return following;
  }

  // count followers
  async countBrandFollowers(brandId: string): Promise<any> {
    const count = await this.followerRepository.count({
      where: {
        brandId,
      },
    });
    return count;
  }

  // count following
  async countUserFollowing(userId: string): Promise<any> {
    const count = await this.followerRepository.count({
      where: { userId },
    });
    return count;
  }
}
