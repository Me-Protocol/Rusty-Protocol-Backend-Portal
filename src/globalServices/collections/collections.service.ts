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

    if (products && products?.length > 0) {
      for (const productId of products) {
        const product = await this.productService.findOneProduct(productId);

        if (product) {
          collectionProducts.push(product);
        }
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

    const newCollection = await this.collectionRepo.save(collection);

    return await this.collectionRepo.findOne({
      where: {
        id: newCollection.id,
      },
      relations: ['products', 'products.productImages'],
    });
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
    let collection: Collection;

    if (userId) {
      collection = await this.collectionRepo.findOne({
        where: {
          id,
          userId,
        },
        relations: ['products', 'products.productImages'],
      });
    }

    if (brandId) {
      collection = await this.collectionRepo.findOne({
        where: {
          id,
          brandId,
        },
        relations: ['products', 'products.productImages'],
      });
    }

    if (!collection) {
      throw new Error('Collection not found');
    }

    await this.collectionRepo.update(
      { id: collection.id },
      { name, description, image, status },
    );

    if (products && products?.length > 0) {
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
    }

    return await this.collectionRepo.save(collection);
  }

  async findAll(
    userId: string,
    brandId: string,
    page: number,
    limit: number,
    order: string,
    search: string,
  ) {
    const collectionQuery = this.collectionRepo
      .createQueryBuilder('collection')
      .leftJoinAndSelect('collection.products', 'products')
      .leftJoinAndSelect('products.productImages', 'productImages')
      .leftJoinAndSelect('collection.brand', 'brand');

    if (userId) {
      collectionQuery.andWhere('collection.userId = :userId', { userId });
    }

    if (brandId) {
      collectionQuery.andWhere('collection.brandId = :brandId', { brandId });
    }

    if (search) {
      collectionQuery.andWhere('collection.name LIKE :search', {
        search: `%${search}%`,
      });
    }

    collectionQuery.skip((page - 1) * limit).take(limit);

    if (order) {
      const formatedOrder = order.split(':')[0];
      const acceptedOrder = [
        'name',
        'description',
        'status',
        'createdAt',
        'updatedAt',
      ];
      if (!acceptedOrder.includes(formatedOrder)) {
        throw new Error('Invalid order param');
      }

      collectionQuery.orderBy(
        `collection.${order.split(':')[0]}`,
        order.split(':')[1] === 'ASC' ? 'ASC' : 'DESC',
      );
    }

    const [data, total] = await collectionQuery.getManyAndCount();

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
      relations: ['products', 'products.productImages'],
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
