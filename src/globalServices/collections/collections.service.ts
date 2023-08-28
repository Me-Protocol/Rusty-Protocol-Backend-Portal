import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './entities/collection.entity';
import { ItemStatus } from '@src/utils/enums/ItemStatus';
import { ProductService } from '../product/product.service';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepo: Repository<Collection>,

    private readonly productService: ProductService,
  ) {}

  async create({
    name,
    description,
    image,
    userId,
    brandId,
    status,
    products,
  }: {
    name: string;
    description: string;
    image: string;
    userId?: string;
    brandId?: string;
    status?: ItemStatus;
    products?: string[];
  }) {
    const collectionProducts = [];

    for (const productId of products) {
      const product = await this.productService.findOneProduct(productId);

      if (product) {
        collectionProducts.push(product);
      }
    }

    const collection = this.collectionRepo.create({
      name,
      description,
      image,
      userId,
      status,
      brandId,
      products: collectionProducts,
    });

    return await this.collectionRepo.save(collection);
  }

  async update(
    id: string,
    userId: string,
    brandId: string,
    {
      name,
      description,
      image,
      status,
      products,
    }: {
      name: string;
      description: string;
      image: string;
      status: ItemStatus;
      products: string[];
    },
  ) {
    const collection = await this.collectionRepo.findOne({
      where: {
        id,
      },
    });

    await this.collectionRepo.update(
      { id, userId },
      { name, description, image, status },
    );

    for (const productId of products) {
      const product = await this.productService.findOneProduct(productId);

      if (product) {
        const checkProduct = collection.products.find(
          (product) => product.id === productId,
        );

        if (!checkProduct) {
          collection.products.push(product);
        }
      }
    }

    return await this.collectionRepo.save(collection);
  }

  async findAll(userId: string, brandId: string, page: number, limit: number) {
    const data = await this.collectionRepo.find({
      where: {
        userId,
        brandId,
      },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['products'],
    });

    const total = await this.collectionRepo.count({
      where: {
        userId,
        brandId,
      },
    });

    return {
      collections: data,
      total,
      nextPage: total > page * limit ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
    };
  }

  findOne({
    id,
    userId,
    brandId,
  }: {
    id: string;
    userId?: string;
    brandId?: string;
  }) {
    return this.collectionRepo.findOne({
      where: {
        id,
        userId,
        brandId,
      },
      relations: ['products', 'offer'],
    });
  }

  findDefaultCollection({
    brandId,
    userId,
  }: {
    brandId?: string;
    userId?: string;
  }) {
    return this.collectionRepo.findOne({
      where: {
        brandId,
        userId,
        isDefault: true,
      },
      relations: ['products'],
    });
  }
}
