import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductService } from '@src/globalServices/product/product.service';
import { CreateProductDto } from './dto/CreateProductDto';
import { CategoryService } from '@src/globalServices/category/category.service';
import { Product } from '@src/globalServices/product/entities/product.entity';
import { UpdateProductDto } from './dto/UpdateProductDto';
import { FilterDto } from './dto/FilterDto';
import { logger } from '@src/globalServices/logger/logger.service';
import { CollectionService } from '@src/globalServices/collections/collections.service';
import { ElasticIndex } from '@src/modules/search/index/search.index';
import { productIndex } from '@src/modules/search/interface/search.interface';
import { ProductStatus } from '@src/utils/enums/ItemStatus';
import { CurrencyService } from '@src/globalServices/currency/currency.service';
import { OfferService } from '@src/globalServices/offer/offer.service';
import { checkProductOnBrandStore } from '@src/globalServices/online-store-handler/check-product';
import { BrandService } from '@src/globalServices/brand/brand.service';

@Injectable()
export class ProductManagementService {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly collectionService: CollectionService,
    private readonly elasticIndex: ElasticIndex,
    private readonly currencyService: CurrencyService,
    private readonly offerService: OfferService,
    private readonly brandService: BrandService,
  ) {}

  async getProductImages(brandId: string, page: number, limit: number) {
    return await this.productService.getProductImages(brandId, page, limit);
  }

  async createProduct(body: CreateProductDto) {
    try {
      if (body.categoryId) {
        const category = await this.categoryService.findOne(body.categoryId);

        if (!category) {
          throw new HttpException('Category does not exist', 400);
        }
      }

      if (body.subCategoryId) {
        const subCategory = await this.categoryService.findOne(
          body.subCategoryId,
        );

        if (!subCategory) {
          throw new HttpException('Sub Category does not exist', 400);
        }
      }

      const productCode = await this.productService.generateProductCode(
        body.name,
      );

      const brand = await this.brandService.getBrandWithOnlineCreds(
        body.brandId,
      );

      const product = new Product();
      product.brandId = body.brandId;
      if (body.categoryId) product.categoryId = body.categoryId;
      if (body.name) product.name = body.name;
      if (body.description) product.description = body.description;
      if (body.price) product.price = body.price;
      if (body.status) {
        product.status = body.status;

        if (body.status === ProductStatus.PUBLISHED) {
          const productOnBrandSite = await checkProductOnBrandStore({
            brand,
            productId: body.productIdOnBrandSite,
          });

          if (!productOnBrandSite) {
            throw new HttpException('Product not found on brand store', 400);
          }
        }
      }
      if (body.inventory) {
        product.inventory = body.inventory;
        product.availableInventory = body.inventory;
      }
      if (body.isUnlimited) product.isUnlimited = body.isUnlimited;
      if (body.subCategoryId) product.subCategoryId = body.subCategoryId;
      if (body.productUrl) product.productUrl = body.productUrl;
      if (body.minAge) product.minAge = body.minAge;
      if (body.coverImage) product.coverImage = body.coverImage;
      product.productCode = productCode;
      product.productIdOnBrandSite = body.productIdOnBrandSite;

      if (body.currencyId) {
        const currency = await this.currencyService.getCurrencyById(
          body.currencyId,
        );

        if (!currency) {
          throw new HttpException('Currency not found', 404);
        }

        product.currencyId = body.currencyId;
      } else if (body.currencyCode) {
        const currency = await this.currencyService.getCurrencyByCurrency(
          body.currencyCode,
        );

        if (!currency) {
          throw new HttpException('Currency not found', 404);
        }
        product.currencyId = currency.id;
      } else {
        const currency = await this.currencyService.getCurrencyByCurrency(
          brand.currency,
        );

        product.currencyId = currency.id;
      }

      const productCollections = [];

      if (body?.collections && body?.collections?.length > 0) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        for (const collectionId of body?.collections) {
          const collection = await this.collectionService.findOne({
            id: collectionId,
            brandId: body.brandId,
          });

          if (collection) {
            productCollections.push(collection);
          }
        }
      }

      product.collections = productCollections;

      if (body.regions && body.regions.length > 0) {
        const regions = [];

        for (const region of body.regions) {
          const checkRegion = await this.currencyService.getRegionById(region);
          if (checkRegion) {
            regions.push(checkRegion);
          }
        }

        product.regions = regions;
      } else {
        const regions = [];

        for (const region of brand.regions) {
          regions.push(region);
        }

        product.regions = regions;
      }

      const newProduct = await this.productService.createProduct(product);

      // upload images
      await this.productService.bulkAddProductImage(
        body.brandId,
        newProduct.id,
        body.productImages,
      );

      // add variants
      if (body?.variants && body?.variants?.length > 0) {
        await this.productService.addVariants(
          body.brandId,
          newProduct.id,
          body.variants,
        );
      }

      const findOneProduct = await this.productService.getOneProduct(
        newProduct.id,
        body.brandId,
      );

      if (body.status === ProductStatus.PUBLISHED) {
        // index product
        await this.elasticIndex.insertDocument(findOneProduct, productIndex);
      }

      return findOneProduct;
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async updateProduct(body: UpdateProductDto, id: string) {
    try {
      const product = await this.productService.getOneProduct(id, body.brandId);

      if (!product) {
        throw new HttpException(
          'Product does not exist or has been deleted',
          400,
        );
      }

      const brand = await this.brandService.getBrandWithOnlineCreds(
        body.brandId,
      );

      if (body.categoryId) {
        const category = await this.categoryService.findOne(body.categoryId);

        if (!category) {
          throw new HttpException('Category does not exist', 400);
        }
      }

      if (body.subCategoryId) {
        const subCategory = await this.categoryService.findOne(
          body.subCategoryId,
        );

        if (!subCategory) {
          throw new HttpException('Sub Category does not exist', 400);
        }
      }

      if (product.status === ProductStatus.ARCHIVED) {
        if (body.status === ProductStatus.PUBLISHED) {
          await this.productService.unarchiveProduct(product.id, body.brandId);
        }
      }

      if (body.currencyId) {
        const currency = await this.currencyService.getCurrencyById(
          body.currencyId,
        );

        if (!currency) {
          throw new HttpException('Currency not found', 404);
        }

        product.currencyId = body.currencyId;
      } else if (body.currencyCode) {
        const currency = await this.currencyService.getCurrencyByCurrency(
          body.currencyCode,
        );

        if (!currency) {
          throw new HttpException('Currency not found', 404);
        }
        product.currencyId = currency.id;
      } else {
        const currency = await this.currencyService.getCurrencyByCurrency(
          brand.currency,
        );

        product.currencyId = currency.id;
      }

      // update only what is provided
      // if (body.name) product.name = body.name;
      // if (body.description) product.description = body.description;
      // if (body.price) product.price = body.price;
      // if (body.status) product.status = body.status;
      // if (body.inventory) product.inventory = body.inventory;
      // if (body.isUnlimited) product.isUnlimited = body.isUnlimited;
      // if (body.productUrl) product.productUrl = body.productUrl;
      // if (body.minAge) product.minAge = body.minAge;
      // if (body.currencyId) product.currencyId = body.currencyId;

      if (body.productImages && body.productImages.length > 0) {
        // upload images
        await this.productService.bulkAddProductImage(
          body.brandId,
          product.id,
          body.productImages,
        );
      }

      if (body.variants && body.variants.length > 0) {
        // add variants
        await this.productService.addVariants(
          body.brandId,
          product.id,
          body.variants,
        );
      }

      if (body.collections && body.collections.length > 0) {
        const productCollections = product.collections ?? [];

        for (const collectionId of body.collections) {
          const collection = await this.collectionService.findOne({
            id: collectionId,
            brandId: body.brandId,
          });

          if (collection) {
            const checkIfCollectionExists = product?.collections?.find(
              (collection) => collection.id === collectionId,
            );

            if (!checkIfCollectionExists) {
              productCollections.push(collection);
            }
          }
        }

        product.collections = productCollections;

        await this.productService.saveProduct(product);
      }

      if (body.regions) {
        const regions = [];

        for (const region of body.regions) {
          const checkRegion = await this.currencyService.getRegionById(region);
          if (checkRegion) {
            regions.push(checkRegion);
          }
        }

        product.regions = regions;

        await this.productService.saveProduct(product);
      }

      if (body.status) {
        product.status = body.status;
        product.productIdOnBrandSite =
          body.productIdOnBrandSite ?? product.productIdOnBrandSite;

        if (body.status === ProductStatus.PUBLISHED) {
          const productOnBrandSite = await checkProductOnBrandStore({
            brand,
            productId: product.productIdOnBrandSite,
          });
          if (!productOnBrandSite) {
            throw new HttpException('Product not found on brand store', 400);
          }
        }
      }

      await this.productService.updateProduct(body, id);

      const findOneProduct = await this.productService.getOneProduct(
        product.id,
        body.brandId,
      );

      // index product
      this.elasticIndex.updateDocument(findOneProduct, productIndex);

      return findOneProduct;
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async deleteProduct(brandId: string, id: string) {
    const product = await this.productService.getOneProduct(id, brandId);

    if (!product) {
      throw new HttpException(
        'Product does not exist or has been deleted',
        400,
      );
    }

    await this.productService.deleteProduct(product.id, brandId);
    await this.offerService.achieveOffersByProductId(product.id);

    return {
      message: 'Product deleted successfully',
    };
  }

  async deleteVariant(variantId: string, brandId: string) {
    const variant = await this.productService.getVariant(variantId, brandId);
    if (!variant) {
      throw new NotFoundException('Variant not found');
    }

    await this.productService.deleteVariant(variantId, brandId);

    return 'Variant deleted';
  }

  async archiveProduct(brandId: string, id: string) {
    const product = await this.productService.getOneProduct(id, brandId);

    if (!product) {
      throw new HttpException(
        'Product does not exist or has been deleted',
        400,
      );
    }

    await this.productService.deleteProduct(product.id, brandId);

    // index product
    this.elasticIndex.deleteDocument(productIndex, product.id);

    return {
      message: 'Product archived successfully',
    };
  }

  async unarchiveProduct(brandId: string, id: string) {
    const product = await this.productService.getOneProduct(id, brandId);

    if (!product) {
      throw new HttpException(
        'Product does not exist or has been deleted',
        400,
      );
    }

    await this.productService.unarchiveProduct(product.id, brandId);

    // index product
    this.elasticIndex.insertDocument(product, productIndex);

    return {
      message: 'Product unarchived successfully',
    };
  }

  async getProduct(brandId: string, id: string) {
    const product = await this.productService.getOneProduct(id, brandId);

    if (!product) {
      throw new HttpException(
        'Product does not exist or has been deleted',
        400,
      );
    }

    return product;
  }

  async getProducts(query: FilterDto) {
    try {
      const products = await this.productService.getProducts(query);

      return products;
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  // @Cron(CronExpression.EVERY_5_MINUTES)
  async syncElasticSearchIndex() {
    const allProducts = await this.productService.getAllProducts();
    await this.elasticIndex.batchCreateIndex(allProducts, productIndex);
  }

  async deleteProductImage(imageId: string) {
    const image = this.productService.getImage(imageId);

    if (!image) {
      throw new HttpException('Image does not exist or has been deleted', 400);
    }

    await this.productService.deleteImage(imageId);

    return 'Ok';
  }
}
