import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/productImage.entity';
import { ProductStatus } from '@src/utils/enums/ItemStatus';
import { Variant } from './entities/variants.entity';
import { ProductFilter } from '@src/utils/enums/OfferFiilter';
import { FilterDto } from '@src/modules/storeManagement/products/dto/FilterDto';
import { UpdateProductDto } from '@src/modules/storeManagement/products/dto/UpdateProductDto';
import { VariantOption } from '@src/globalServices/product/entities/variantvalue.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepo: Repository<ProductImage>,
    @InjectRepository(Variant)
    private readonly variantRepo: Repository<Variant>,
    @InjectRepository(VariantOption)
    private readonly variantOptionRepo: Repository<VariantOption>,
  ) {}

  async getAllProducts() {
    return await this.productRepo.find({
      relations: ['brand', 'productImages', 'variants', 'category'],
    });
  }

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
      nextPage: total > page * limit ? Number(page) + 1 : null,
      previousPage: page > 1 ? Number(page) - 1 : null,
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

  async getImage(id: string) {
    return await this.productImageRepo.findOne({
      where: {
        id,
      },
    });
  }

  async deleteImage(id: string) {
    return await this.productImageRepo.softDelete({
      id,
    });
  }

  private async createVariant(
    productId: string,
    name: string,
    isCustom: boolean,
  ): Promise<Variant> {
    const variant = this.variantRepo.create({ name, isCustom, productId });
    return await this.variantRepo.save(variant);
  }

  private async syncVariantOptions(
    variant: Variant,
    optionsData: {
      name: string;
      value: string;
      price: number;
      inventory: number;
    }[],
  ): Promise<VariantOption[]> {
    const variantOptions = await Promise.all(
      optionsData.map(async (optionData) => {
        let option = await this.variantOptionRepo.findOne({
          where: { variantId: variant.id, name: optionData.name.toLowerCase() },
        });

        if (!option) {
          option = this.variantOptionRepo.create({
            ...optionData,
            name: optionData.name.toLowerCase(),
            variantId: variant.id,
          });
        } else {
          option.value = optionData.value;
          option.price = optionData.price;
          option.inventory = optionData.inventory;
        }
        return option;
      }),
    );
    return await this.variantOptionRepo.save(variantOptions);
  }

  async addVariants(
    brandId: string,
    productId: string,
    variantsData: {
      name: string;
      isCustom: boolean;
      options: {
        name: string;
        value: string;
        price: number;
        inventory: number;
      }[];
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

    const existingVariants = await this.variantRepo.find({
      where: { productId },
    });

    const productVariants = await Promise.all(
      variantsData.map(async (variantData) => {
        let variant = existingVariants.find(
          (v) => v.name.toLowerCase() === variantData.name.toLowerCase(),
        );
        if (!variant) {
          variant = await this.createVariant(
            productId,
            variantData.name.toLowerCase(),
            variantData.isCustom,
          );
        }
        variant.options = await this.syncVariantOptions(
          variant,
          variantData.options,
        );
        return variant;
      }),
    );

    return await this.variantRepo.save(productVariants);
  }

  async createProduct(product: Product) {
    return this.productRepo.save(product);
  }

  async updateProduct(body: UpdateProductDto, id: string) {
    const product = await this.productRepo.findOne({
      where: {
        id,
      },
    });

    return this.productRepo.update(
      { id: id },
      {
        name: body.name ?? product.name,
        description: body.description ?? product.description,
        categoryId: body.categoryId ?? product.categoryId,
        status: body.status ?? product.status,
        price: body.price ?? product.price,
        inventory: body.inventory ?? product.inventory,
        isUnlimited: body.isUnlimited ?? product.isUnlimited,
        subCategoryId: body.subCategoryId ?? product.subCategoryId,
        productUrl: body.productUrl ?? product.productUrl,
        minAge: body.minAge ?? product.minAge,
        currencyId: body.currencyId ?? product.currencyId,
        coverImage: body.coverImage ?? product.coverImage,
        productIdOnBrandSite:
          body.productIdOnBrandSite ?? product.productIdOnBrandSite,
      },
    );
  }

  async saveProduct(product: Product) {
    return this.productRepo.save(product);
  }

  async deleteVariant(id: string, brandId: string) {
    return await this.variantRepo.softDelete({
      id,
      product: {
        brandId,
      },
    });
  }

  async getVariant(id: string, brandId: string) {
    return await this.variantRepo.findOne({
      where: { id, product: { brandId } },
    });
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
      nextPage: total > page * limit ? Number(page) + 1 : null,
      previousPage: page > 1 ? Number(page) - 1 : null,
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
      relations: [
        'category',
        'productImages',
        'brand',
        'variants',
        'variants.options',
      ],
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
    filterBy,
    search,
    startDate,
    subCategoryId,
    endDate,
    collectionId,
  }: FilterDto) {
    const products = this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productImages', 'productImages')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.variants', 'variants')
      .leftJoinAndSelect('variants.options', 'options')
      .leftJoinAndSelect('product.collections', 'collections')
      .leftJoinAndSelect('product.offers', 'offers')
      .where('product.brandId = :brandId', { brandId });

    if (status) {
      products.andWhere('product.status = :status', { status });
    }

    if (categoryId) {
      products.andWhere('product.categoryId = :categoryId', { categoryId });
    }

    if (subCategoryId) {
      products.andWhere('product.subCategoryId = :subCategoryId', {
        subCategoryId,
      });
    }

    if (filterBy === ProductFilter.LOW_IN_STOCK) {
      products.andWhere('product.inventory <= 5');
      products.orderBy('product.inventory', 'ASC');
    }

    if (filterBy === ProductFilter.MOST_RECENT) {
      products.andWhere('product.createdAt > :createdAt', {
        createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7),
      });
      products.orderBy('product.createdAt', 'DESC');
    }

    if (search) {
      products.andWhere('product.name ILIKE :search', {
        search: `%${search}%`,
      });
    }

    if (startDate && endDate) {
      products.andWhere('product.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    if (collectionId) {
      products.andWhere('collections.id = :collectionId', {
        collectionId,
      });
    }

    if (order) {
      const formatedOrder = order.split(':')[0];
      const acceptedOrder = [
        'name',
        'description',
        'status',
        'price',
        'inventory',
        'isUnlimited',
        'productCode',
        'createdAt',
        'updatedAt',
      ];

      if (!acceptedOrder.includes(formatedOrder)) {
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
      nextPage: total > page * limit ? Number(page) + 1 : null,
      previousPage: page > 1 ? Number(page) - 1 : null,
    };
  }
}
