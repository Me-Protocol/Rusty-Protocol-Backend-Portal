import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './entities/collection.entity';
import { ItemStatus } from '@src/utils/enums/ItemStatus';
import { ProductService } from '../product/product.service';
import { LikeService } from '../like/like.service';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepo: Repository<Collection>,

    private readonly productService: ProductService,
    private readonly likeService: LikeService,
  ) {}

  async create({
    name,
    description,
    image,
    userId,
    brandId,
    status,
    products,
    isDefault,
    isPublic,
  }: {
    name: string;
    description: string;
    image: string;
    userId?: string;
    brandId?: string;
    status?: ItemStatus;
    products?: string[];
    isDefault?: boolean;
    isPublic?: boolean;
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
      isDefault,
      isPublic,
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
    try {
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
        throw new NotFoundException('Collection not found');
      }

      // await this.collectionRepo.update(
      //   { id: collection.id },
      //   { name, description, image, status },
      // );

      if (name) collection.name = name;
      if (description) collection.description = description;
      if (image) collection.image = image;
      if (status) collection.status = status;

      if (products && products?.length > 0) {
        const newCollectionProducts: Product[] = [];

        for (const productId of products) {
          const product = await this.productService.findOneProduct(productId);

          if (product) {
            // const checkProduct = collection.products.find(
            //   (product) => product.id === productId,
            // );

            // if (!checkProduct) {
            //   newCollectionProducts.push(product);
            // }

            newCollectionProducts.push(product);
          }
        }

        collection.products = newCollectionProducts;
      }

      return await this.collectionRepo.save(collection);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  async findAll({
    userId,
    brandId,
    page,
    limit = 10,
    order,
    search,
    status,
  }: {
    userId: string;
    brandId: string;
    page: number;
    limit: number;
    order: string;
    search: string;
    status: ItemStatus;
  }) {
    const collectionQuery = this.collectionRepo
      .createQueryBuilder('collection')
      .leftJoinAndSelect('collection.products', 'products')
      .leftJoinAndSelect('products.productImages', 'productImages')
      .leftJoinAndSelect('collection.brand', 'brand');

    if (status) {
      collectionQuery.andWhere('collection.status = :status', { status });
    }

    if (userId) {
      collectionQuery.andWhere('collection.userId = :userId', { userId });
    }

    if (brandId) {
      collectionQuery.andWhere('collection.brandId = :brandId', { brandId });
    }

    if (search) {
      collectionQuery.andWhere('collection.name ILIKE :search', {
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

    const collections = [];

    for (const collection of data) {
      const likes = await this.likeService.getLikesByCollectionId(
        collection.id,
      );

      collections.push({
        ...collection,
        likes: likes,
        totalLikes: likes.length,
      });
    }

    return {
      collections,
      total,
      nextPage: total > page * limit ? Number(page) + 1 : null,
      previousPage: page > 1 ? Number(page) - 1 : null,
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
      relations: [
        'products',
        'products.productImages',
        'likes',
        'likes.offer',
        'likes.offer.offerImages',
      ],
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

  async checkIfOfferExistInCollection(offerId: string, userId: string) {
    const collection = await this.collectionRepo
      .createQueryBuilder('collection')
      .leftJoinAndSelect('collection.products', 'products')
      .where('collection.userId = :userId', { userId })
      .andWhere('products.id = :offerId', { offerId })
      .getOne();

    return collection;
  }

  async delete(id: string, userId: string, brandId: string) {
    const collection = await this.collectionRepo.findOne({
      where: {
        id,
        userId,
        brandId,
      },
    });

    if (!collection) {
      throw new Error('Collection not found');
    }

    await this.collectionRepo.softDelete({ id });

    return 'Successfully deleted';
  }
}
