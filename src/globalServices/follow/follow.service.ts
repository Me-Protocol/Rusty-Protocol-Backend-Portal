import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from './entities/follow.entity';
import { BrandService } from '../brand/brand.service';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private readonly followerRepository: Repository<Follow>,

    private readonly brandService: BrandService,
  ) {}

  // get brands followers
  async getBrandsFollowers({
    brandId,
    page,
    limit,
  }: {
    brandId: string;
    page: number;
    limit: number;
  }) {
    const followerQuery = this.followerRepository
      .createQueryBuilder('follow')
      .leftJoinAndSelect('follow.user', 'user')
      .leftJoinAndSelect('user.customer', 'customer')
      .select([
        'follow.id',
        'follow.createdAt',
        'follow.updatedAt',
        'user.id',
        'user.username',
        'customer.name',
        'customer.profilePicture',
      ])
      .where('follow.brandId = :brandId', { brandId })
      .skip((page - 1) * limit)
      .take(limit);

    const followers = await followerQuery.getMany();
    const total = await followerQuery.getCount();

    return {
      total,
      followers,
      nextPage: total > page * limit ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
    };
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
  async unfollow(brandId: string, userId: string): Promise<string> {
    await this.followerRepository.softDelete({
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
  async getUsersFollowing(userId: string, page: number, limit: number) {
    const followerQuery = this.followerRepository
      .createQueryBuilder('follow')
      .leftJoinAndSelect('follow.user', 'user')
      .leftJoinAndSelect('user.customer', 'customer')
      .select([
        'follow.id',
        'follow.createdAt',
        'follow.updatedAt',
        'user.id',
        'user.username',
        'customer.name',
        'customer.profilePicture',
      ])
      .where('follow.userId = :userId', { userId })
      .skip((page - 1) * limit)
      .take(limit);

    const following = await followerQuery.getMany();
    const total = await followerQuery.getCount();

    return {
      total,
      following,
      nextPage: total > page * limit ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
    };
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
