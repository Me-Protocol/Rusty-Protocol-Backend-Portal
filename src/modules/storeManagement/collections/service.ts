import { Injectable } from '@nestjs/common';
import { CollectionService } from '@src/globalServices/collections/collections.service';
import { CreateCollectionDto } from './dto/CreateCollectionDto.dto';
import { UpdateCollectionDto } from './dto/UpdateCollectionDto.dto';
import { FIlterCollectionDto } from './dto/FilterCollectionDto.dto';

@Injectable()
export class CollectionManagementService {
  constructor(private readonly collectionService: CollectionService) {}

  async create(body: CreateCollectionDto) {
    const collection = await this.collectionService.create(body);
    return collection;
  }

  async update(id: string, body: UpdateCollectionDto) {
    return await this.collectionService.update(
      id,
      body.userId,
      body.brandId,
      body,
    );
  }

  async findAll(query: FIlterCollectionDto) {
    return await this.collectionService.findAll(
      query.userId,
      query.brandId,
      query.page,
      query.limit,
      query.order,
    );
  }

  async findOne(id: string, userId: string, brandId: string) {
    return await this.collectionService.findOne({ id, userId, brandId });
  }
}
