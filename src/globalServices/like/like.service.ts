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
    const result = await this.likeRepo.delete(id);
    return result;
  }

  async getUserLikes(
    userId: string,
    orderBy: 'date_added' | 'expiring_soon' | 'new',
    collectionId?: string,
  ): Promise<any> {
    const result = await this.likeRepo.find({
      where: {
        userId,
        collectionId,
      },
      relations: ['offer', 'offer.brand'],
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
    });
    return result;
  }

  async getOfferLikes(offerId: string): Promise<any> {
    const result = await this.likeRepo.find({
      where: {
        offerId,
      },
    });
    return result;
  }

  async unlikeWithOfferIdAndUserId(
    offerId: string,
    userId: string,
  ): Promise<any> {
    const result = await this.likeRepo.delete({
      offerId,
      userId,
    });
    return result;
  }

  async getCollectionLikes(collectionId: string): Promise<any> {
    const result = await this.likeRepo.find({
      where: {
        collectionId,
      },
      relations: ['offer', 'offer.brand'],
    });
    return result;
  }

  async getLikeById(id: string): Promise<any> {
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

  async getLikesByIdAndUserId(offerId: string, userId: string): Promise<Like> {
    const result = await this.likeRepo.findOne({
      where: {
        offerId,
        userId,
      },
    });
    return result;
  }
}
