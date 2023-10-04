import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepo: Repository<Like>,
  ) {}

  async createLike(like: Like): Promise<Like> {
    const checkLike = await this.getLikesByIdAndCollectionId(
      like.offerId,
      like.collectionId,
      like.userId,
    );

    if (checkLike) {
      return checkLike;
    }

    const result = await this.likeRepo.save(like);

    return result;
  }

  async updateLike(id: string, like: Like): Promise<any> {
    const result = await this.likeRepo.update(
      {
        id: id,
      },
      like,
    );

    return result;
  }

  async deleteLike(id: number): Promise<any> {
    const result = await this.likeRepo.softDelete(id);
    return result;
  }

  async getUserLikes(
    userId: string,
    orderBy: 'date_added' | 'expiring_soon' | 'new',
    page: number,
    limit: number,
    collectionId?: string,
  ): Promise<any> {
    const result = await this.likeRepo.find({
      where: {
        userId,
        collectionId,
      },
      relations: ['offer', 'offer.brand', 'offer.reward', 'offer.offerImages'],
      order:
        orderBy === 'date_added'
          ? { createdAt: 'DESC' }
          : orderBy === 'expiring_soon'
          ? { offer: { createdAt: 'ASC' } }
          : {
              offer: {
                createdAt: 'DESC',
              },
            },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await this.likeRepo.count({
      where: {
        userId,
        collectionId,
      },
    });

    return {
      total,
      likes: result,
      nextPage: total > page * limit ? Number(page) + 1 : null,
      previousPage: page > 1 ? Number(page) - 1 : null,
    };
  }

  async getOfferLikes(offerId: string): Promise<any> {
    const result = await this.likeRepo.find({
      where: {
        offerId,
      },
    });
    return result;
  }

  async unlikeWithOfferIdAndUserId(offerId: string, userId: string) {
    const result = await this.likeRepo.softDelete({
      offerId,
      userId,
    });
    return result;
  }

  async getCollectionLikes(collectionId: string) {
    const result = await this.likeRepo.find({
      where: {
        collectionId,
      },
      relations: ['offer', 'offer.brand'],
    });
    return result;
  }

  async getLikeById(id: string) {
    const result = await this.likeRepo.findOne({
      where: {
        id: id,
      },
    });
    return result;
  }

  async getLikesByIdAndCollectionId(
    offerId: string,
    collectionId: string,
    userId: string,
  ): Promise<Like> {
    const result = await this.likeRepo.findOne({
      where: {
        offerId,
        collectionId,
        userId,
      },
    });

    return result;
  }

  async getLikesByOfferIdAndUserId(
    offerId: string,
    userId: string,
  ): Promise<Like> {
    const result = await this.likeRepo.findOne({
      where: {
        offerId,
        userId,
      },
    });
    return result;
  }

  async getLikesByCollectionId(collectionId: string) {
    return await this.likeRepo.find({
      where: {
        collectionId,
      },
      relations: ['offer', 'offer.brand', 'offer.reward', 'offer.offerImages'],
      take: 4,
    });
  }

  async getUsersLikes(
    userId: string,
    collectionId: string,
    page: number,
    limit: number,
  ) {
    const likeQuery = this.likeRepo
      .createQueryBuilder('like')
      .leftJoinAndSelect('like.offer', 'offer')
      .leftJoinAndSelect('offer.brand', 'brand')
      .leftJoinAndSelect('offer.offerImages', 'offerImages')
      .leftJoinAndSelect('offer.reward', 'reward')
      .where('like.userId = :userId', { userId })
      .andWhere('like.collectionId = :collectionId', { collectionId })
      .skip((page - 1) * limit)
      .take(limit);

    const likes = await likeQuery.getMany();
    const total = await likeQuery.getCount();

    return {
      total,
      likes,
      nextPage: total > page * limit ? Number(page) + 1 : null,
      previousPage: page > 1 ? Number(page) - 1 : null,
    };
  }
}
