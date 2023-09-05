import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/productImage.entity';
import { ItemStatus, ProductStatus } from '@src/utils/enums/ItemStatus';
import { Variant } from './entities/variants.entity';
import { VarientType } from '@src/utils/enums/VarientType';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepo: Repository<ProductImage>,

    @InjectRepository(Variant)
    private readonly variantRepo: Repository<Variant>,
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
      relations: ['productImages'],
    });
    if (!product) {
      throw new Error('Product not found');
    }

    const productImages = [];

    for (const image of images) {
      // check if image already exists
      const imageExists = product.productImages.find(
        (productImage) => productImage.url === image,
      );

      if (!imageExists) {
        productImages.push(
          this.productImageRepo.create({
            url: image,
            product,
          }),
        );
      }
    }

    return this.productImageRepo.save(productImages);
  }

  async addVariants(
    brandId: string,
    productId: string,
    variants: {
      name: VarientType;
      value: string;
      price: number;
      inventory: number;
    }[],
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

    const productVariants = variants.map((variant) =>
      this.variantRepo.create({
        ...variant,
        productId,
      }),
    );

    return this.variantRepo.save(productVariants);
  }

  async createProduct(product: Product) {
    return this.productRepo.save(product);
  }

  async updateProduct(product: Product) {
    return this.productRepo.update({ id: product.id }, product);
  }

  async saveProduct(product: Product) {
    return this.productRepo.save(product);
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
      relations: ['category', 'productImages', 'brand', 'variants'],
    });
  }

  async findOneProduct(productId: string) {
    return await this.productRepo.findOne({
      where: {
        id: productId,
      },
    });
  }

  async generateProductCode(name: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    // get caps from name
    const caps = name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('');

    const codeWithCaps = `${code}_${caps}`;

    const product = await this.productRepo.findOne({
      where: {
        productCode: codeWithCaps,
      },
    });

    if (product) {
      return this.generateProductCode(name);
    }

    return codeWithCaps;
  }

  async deleteProduct(productId: string, brandId: string) {
    return await this.productRepo.softDelete({
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
    order,
  }: {
    page: number;
    limit: number;
    status?: ProductStatus;
    brandId?: string;
    categoryId?: string;
    order: string;
  }) {
    const products = this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productImages', 'productImages')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.variants', 'variants')
      .leftJoinAndSelect('product.collections', 'collections')
      .leftJoinAndSelect('product.offers', 'offers')
      .where('product.brandId = :brandId', { brandId });

    if (status) {
      products.andWhere('product.status = :status', { status });
    }

    if (categoryId) {
      products.andWhere('product.categoryId = :categoryId', { categoryId });
    }

    if (order) {
      const formatedOrder = order.split(':')[0];
      const acceptedOrder = new Product();
      if (!acceptedOrder.hasOwnProperty(formatedOrder)) {
        throw new Error('Invalid order param');
      }

      products.orderBy(
        `product.${order.split(':')[0]}`,
        order.split(':')[1] === 'ASC' ? 'ASC' : 'DESC',
      );
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
