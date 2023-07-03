import { HttpException, Injectable } from '@nestjs/common';
import { ProductService } from '@src/globalServices/product/product.service';
import { CreateProductDto } from './dto/CreateProductDto';
import { CategoryService } from '@src/globalServices/category/category.service';
import { Product } from '@src/globalServices/product/entities/product.entity';
import { UpdateProductDto } from './dto/UpdateProductDto';
import { FilterDto } from './dto/FilterDto';

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
    const category = await this.categoryService.findOne(body.categoryId);

    if (!category) {
      throw new HttpException('Category does not exist', 400);
    }

    const productCode = await this.productService.generateProductCode(
      body.brandId,
    );

    const product = new Product();
    product.brandId = body.brandId;
    product.categoryId = body.categoryId;
    product.name = body.name;
    product.description = body.description;
    product.price = body.price;
    product.status = body.status;
    product.inventory = body.inventory;
    product.isUnlimited = body.isUnlimited;
    product.productCode = productCode;
    product.subCategoryId = body.subCategoryId;

    const newProduct = await this.productService.createProduct(product);

    // upload images
    await this.productService.bulkAddProductImage(
      body.brandId,
      newProduct.id,
      body.productImages,
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

    const category = await this.categoryService.findOne(body.categoryId);

    if (!category) {
      throw new HttpException('Category does not exist', 400);
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
    const products = await this.productService.getProducts(query);

    return products;
  }
}
