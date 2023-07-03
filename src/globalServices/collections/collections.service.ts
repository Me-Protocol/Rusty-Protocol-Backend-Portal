import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './entities/collection.entity';
import { ItemStatus } from '@src/utils/enums/ItemStatus';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepo: Repository<Collection>,
  ) {}

  create({
    name,
    description,
    image,
    userId,
    status,
  }: {
    name: string;
    description: string;
    image: string;
    userId: string;
    status: ItemStatus;
  }) {
    const collection = this.collectionRepo.create({
      name,
      description,
      image,
      userId,
      status,
    });

    return this.collectionRepo.save(collection);
  }

  update(
    id: string,
    userId: string,
    {
      name,
      description,
      image,
      status,
    }: {
      name: string;
      description: string;
      image: string;
      status: ItemStatus;
    },
  ) {
    return this.collectionRepo.update(
      { id, userId },
      { name, description, image, status },
    );
  }

  async findAll(userId: string, page: number, limit: number) {
    const data = await this.collectionRepo.find({
      where: {
        userId,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await this.collectionRepo.count({
      where: {
        userId,
      },
    });

    return {
      data,
      total,
      nextPage: total > page * limit ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
    };
  }

  findOne(id: string, userId: string) {
    return this.collectionRepo.findOne({
      where: {
        id,
        userId,
      },
    });
  }
}
