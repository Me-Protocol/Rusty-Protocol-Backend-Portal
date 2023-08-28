import { HttpException, Injectable } from '@nestjs/common';
import { ProductService } from '@src/globalServices/product/product.service';
import { CreateProductDto } from './dto/CreateProductDto';
import { CategoryService } from '@src/globalServices/category/category.service';
import { Product } from '@src/globalServices/product/entities/product.entity';
import { UpdateProductDto } from './dto/UpdateProductDto';
import { FilterDto } from './dto/FilterDto';
import { logger } from '@src/globalServices/logger/logger.service';

@Injectable()
export class ProductManagementService {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  async getProductImages(brandId: string, page: number, limit: number) {
    return await this.productService.getProductImages(brandId, page, limit);
  }

  async createProduct(body: CreateProductDto) {
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

    const productCode = await this.productService.generateProductCode();

    const product = new Product();
    product.brandId = body.brandId;
    if (body.categoryId) product.categoryId = body.categoryId;
    if (body.name) product.name = body.name;
    if (body.description) product.description = body.description;
    if (body.price) product.price = body.price;
    if (body.status) product.status = body.status;
    if (body.inventory) product.inventory = body.inventory;
    if (body.isUnlimited) product.isUnlimited = body.isUnlimited;
    if (body.subCategoryId) product.subCategoryId = body.subCategoryId;
    product.productCode = productCode;

    const newProduct = await this.productService.createProduct(product);

    // upload images
    await this.productService.bulkAddProductImage(
      body.brandId,
      newProduct.id,
      body.productImages,
    );

    // add variants
    await this.productService.addVariants(
      body.brandId,
      newProduct.id,
      body.variants,
    );

    return await this.productService.getOneProduct(newProduct.id, body.brandId);
  }

  async updateProduct(body: UpdateProductDto, id: string) {
    const product = await this.productService.getOneProduct(id, body.brandId);

    if (!product) {
      throw new HttpException(
        'Product does not exist or has been deleted',
        400,
      );
    }

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

    // update only what is provided
    if (body.name) product.name = body.name;
    if (body.description) product.description = body.description;
    if (body.price) product.price = body.price;
    if (body.status) product.status = body.status;
    if (body.inventory) product.inventory = body.inventory;
    if (body.isUnlimited) product.isUnlimited = body.isUnlimited;
    if (body.subCategoryId) product.subCategoryId = body.subCategoryId;
    if (body.categoryId) product.categoryId = body.categoryId;

    if (body.productImages.length > product.productImages.length) {
      // upload images
      await this.productService.bulkAddProductImage(
        body.brandId,
        product.id,
        body.productImages,
      );
    }

    if (body.variants.length > product.variants.length) {
      // add variants
      await this.productService.addVariants(
        body.brandId,
        product.id,
        body.variants,
      );
    }

    await this.productService.updateProduct(product);

    return await this.productService.getOneProduct(product.id, body.brandId);
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

    return {
      message: 'Product deleted successfully',
    };
  }

  async archiveProduct(brandId: string, id: string) {
    const product = await this.productService.getOneProduct(id, brandId);

    if (!product) {
      throw new HttpException(
        'Product does not exist or has been deleted',
        400,
      );
    }

    await this.productService.archiveProduct(product.id, brandId);

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
}
