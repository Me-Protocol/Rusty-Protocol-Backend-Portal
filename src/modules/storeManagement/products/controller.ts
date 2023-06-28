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

@UseInterceptors(ResponseInterceptor)
@Controller('store/product')
export class ProductManagementController {
  constructor(
    private readonly productManagementService: ProductManagementService,
  ) {}

  @UseGuards(BrandJwtStrategy)
  @Post()
  async createCategory(
    @Body(ValidationPipe) body: CreateProductDto,
    @Req() req: any,
  ) {
    const brandId = req.user.brand.id;
    body.brandId = brandId;

    return await this.productManagementService.createProduct(body);
  }

  @UseGuards(BrandJwtStrategy)
  @Put(':productId')
  async updateCategory(
    @Body(ValidationPipe) body: CreateProductDto,
    @Param('productId') productId: string,
    @Req() req: any,
  ) {
    const brandId = req.user.brand.id;
    body.brandId = brandId;
    return await this.productManagementService.updateProduct(body, productId);
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
  @Delete(':productId')
  async deleteProduct(@Param('productId') productId: string, @Req() req: any) {
    const brandId = req.user.brand.id;
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
  async getAllProducts(@Query() query: FilterDto, @Req() req: any) {
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
