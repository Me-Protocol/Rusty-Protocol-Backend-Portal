import {
  Controller,
  Body,
  UseInterceptors,
  UseGuards,
  ValidationPipe,
  Put,
  Post,
  Param,
  Get,
  Query,
  Req,
  Delete,
} from '@nestjs/common';
import { ResponseInterceptor } from '@src/interceptors/response.interceptor';
import { ProductManagementService } from './service';
import { BrandJwtStrategy } from '@src/middlewares/brand-jwt-strategy.middleware';
import { CreateProductDto } from './dto/CreateProductDto';
import { FilterDto } from './dto/FilterDto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateProductDto } from './dto/UpdateProductDto';
import { ApiKeyJwtStrategy } from '@src/middlewares/api-jwt-strategy.middleware';
import { DeleteVariantDto } from './dto/DeleteVariantDto.dto';
import { ApiBearerAuth } from '@node_modules/@nestjs/swagger';

ApiTags('Products');
@Controller('store/product')
@ApiBearerAuth()
export class ProductManagementController {
  constructor(
    private readonly productManagementService: ProductManagementService,
  ) {}

  @UseGuards(BrandJwtStrategy)
  @Post()
  async createProduct(
    @Body(ValidationPipe) body: CreateProductDto,
    @Req() req: any,
  ) {
    const brandId = req.user.brand.id;
    body.brandId = brandId;

    return await this.productManagementService.createProduct(body);
  }

  @UseGuards(ApiKeyJwtStrategy)
  @Post('create')
  async createProductWithApiKey(
    @Body(ValidationPipe) body: CreateProductDto,
    @Req() req: any,
  ) {
    const brandId = req.brand.id;
    body.brandId = brandId;

    return await this.productManagementService.createProduct(body);
  }

  @UseGuards(BrandJwtStrategy)
  @Put(':productId')
  async updateProduct(
    @Body(ValidationPipe) body: UpdateProductDto,
    @Param('productId') productId: string,
    @Req() req: any,
  ) {
    const brandId = req.user.brand.id;
    body.brandId = brandId;
    return await this.productManagementService.updateProduct(body, productId);
  }

  @UseGuards(ApiKeyJwtStrategy)
  @Put('/update/:productId')
  async updateProductWithAPIKey(
    @Body(ValidationPipe) body: UpdateProductDto,
    @Param('productId') productId: string,
    @Req() req: any,
  ) {
    const brandId = req.brand.id;
    body.brandId = brandId;
    return await this.productManagementService.updateProduct(body, productId);
  }

  @UseGuards(BrandJwtStrategy)
  @Delete('/variant/delete')
  async deleteVariant(
    @Body(ValidationPipe) body: DeleteVariantDto,
    @Req() req: any,
  ) {
    const brandId = req.user.brand.id;
    body.brandId = brandId;
    return await this.productManagementService.deleteVariant(
      body.variantId,
      brandId,
    );
  }

  @UseGuards(BrandJwtStrategy)
  @Get('/images')
  async getProductImages(
    @Query() FilterProductImages: FilterDto,
    @Req() req: any,
  ) {
    const brandId = req.user.brand.id;
    return await this.productManagementService.getProductImages(
      brandId,
      FilterProductImages.page,
      FilterProductImages.limit,
    );
  }

  @UseGuards(BrandJwtStrategy)
  @Delete('/images/:imageId')
  async deleteProductImage(@Param('imageId') imageId: string) {
    return await this.productManagementService.deleteProductImage(imageId);
  }

  @UseGuards(BrandJwtStrategy)
  @Delete(':productId')
  async deleteProduct(@Param('productId') productId: string, @Req() req: any) {
    const brandId = req.user.brand.id;
    return await this.productManagementService.deleteProduct(
      brandId,
      productId,
    );
  }

  @UseGuards(ApiKeyJwtStrategy)
  @Delete('/delete/:productId')
  async deleteProductWithApiKey(
    @Param('productId') productId: string,
    @Req() req: any,
  ) {
    const brandId = req.brand.id;
    return await this.productManagementService.deleteProduct(
      brandId,
      productId,
    );
  }

  @UseGuards(BrandJwtStrategy)
  @Put('/archive/:productId')
  async archiveProduct(@Param('productId') productId: string, @Req() req: any) {
    const brandId = req.user.brand.id;
    return await this.productManagementService.archiveProduct(
      brandId,
      productId,
    );
  }

  @UseGuards(BrandJwtStrategy)
  @Put('/unarchive/:productId')
  async unarchiveProduct(
    @Param('productId') productId: string,
    @Req() req: any,
  ) {
    const brandId = req.user.brand.id;
    return await this.productManagementService.unarchiveProduct(
      brandId,
      productId,
    );
  }

  @UseGuards(BrandJwtStrategy)
  @Get('')
  async getAllProducts(
    @Query(ValidationPipe) query: FilterDto,
    @Req() req: any,
  ) {
    const brandId = req.user.brand.id;
    query.brandId = brandId;

    return await this.productManagementService.getProducts(query);
  }

  @UseGuards(BrandJwtStrategy)
  @Get(':productId')
  async getProductById(@Param('productId') productId: string, @Req() req: any) {
    const brandId = req.user.brand.id;
    return await this.productManagementService.getProduct(brandId, productId);
  }
}
