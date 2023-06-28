import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/productImage.entity';
import { ProductStatus } from '@src/utils/enums/ProductStatus';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepo: Repository<ProductImage>,
  ) {}

  async getProductImages(brandId: string, page: number, limit: number) {
    const images = await this.productImageRepo.find({
      where: {
        product: {
          brandId,
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await this.productImageRepo.count({
      where: {
        product: {
          brandId,
        },
      },
    });

    return {
      images,
      total,
      nextPage: total > page * limit ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
    };
  }

  async bulkAddProductImage(
    brandId: string,
    productId: string,
    images: string[],
  ) {
    const product = await this.productRepo.findOne({
      where: {
        id: productId,
        brandId,
      },
    });
    if (!product) {
      throw new Error('Product not found');
    }

    const productImages = images.map((image) =>
      this.productImageRepo.create({
        url: image,
        product,
      }),
    );

    return this.productImageRepo.save(productImages);
  }

  async createProduct(product: Product) {
    return this.productRepo.save(product);
  }

  async updateProduct(product: Product) {
    return this.productRepo.update({ id: product.id }, product);
  }

  async getBrandProducts(
    brandId: string,
    page: number,
    limit: number,
    status?: ProductStatus,
  ) {
    const products = await this.productRepo.find({
      where: {
        brandId,
        status,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await this.productRepo.count({
      where: {
        brandId,
      },
    });

    return {
      products,
      total,
      nextPage: total > page * limit ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
    };
  }

  async getBrandProduct(brandId: string, productId: string) {
    return this.productRepo.findOne({
      where: {
        id: productId,
        brandId,
      },
    });
  }

  async archiveProduct(brandId: string, productId: string) {
    return await this.productRepo.update(
      {
        id: productId,
        brandId,
      },
      {
        status: ProductStatus.ARCHIVED,
      },
    );
  }

  async unarchiveProduct(brandId: string, productId: string) {
    return await this.productRepo.update(
      {
        id: productId,
        brandId,
      },
      {
        status: ProductStatus.DRAFT,
      },
    );
  }

  async getOneProduct(productId: string, brandId: string) {
    return await this.productRepo.findOne({
      where: {
        brandId,
        id: productId,
      },
      relations: ['category', 'productImages', 'brand'],
    });
  }

  async generateProductCode(brandId: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const product = await this.productRepo.findOne({
      where: {
        brandId,
        productCode: code,
      },
    });

    if (product) {
      return this.generateProductCode(brandId);
    }

    return code;
  }

  async deleteProduct(productId: string, brandId: string) {
    return await this.productRepo.delete({
      id: productId,
      brandId,
    });
  }

  async getProducts({
    page,
    limit,
    status,
    brandId,
    categoryId,
  }: {
    page: number;
    limit: number;
    status?: ProductStatus;
    brandId?: string;
    categoryId?: string;
  }) {
    const products = this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productImages', 'productImages')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.brand', 'brand')
      .where('product.brandId = :brandId', { brandId });

    if (status) {
      products.andWhere('product.status = :status', { status });
    }

    if (categoryId) {
      products.andWhere('product.categoryId = :categoryId', { categoryId });
    }

    const total = await products.getCount();

    const data = await products
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return {
      products: data,
      total,
      nextPage: total > page * limit ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
    };
  }
}
