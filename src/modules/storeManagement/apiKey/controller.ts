import {
  Controller,
  UseInterceptors,
  UseGuards,
  Post,
  Get,
  Req,
  ValidationPipe,
  Body,
  Delete,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ResponseInterceptor } from '@src/interceptors/response.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { ApiKeyManagementService } from './service';
import { BrandJwtStrategy } from '@src/middlewares/brand-jwt-strategy.middleware';
import { ApiKeyJwtStrategy } from '@src/middlewares/api-jwt-strategy.middleware';
import { CreateApiDto } from './dto/createApiDto';
import { ApiBearerAuth } from '@node_modules/@nestjs/swagger';

@ApiTags('API Key')
@Controller('api_key')
@ApiBearerAuth()
export class ApiKeyManagementController {
  constructor(
    private readonly apiKeyManagementService: ApiKeyManagementService,
  ) {}

  @UseGuards(BrandJwtStrategy)
  @Post()
  async createApiKey(
    @Req() req: any,
    @Body(ValidationPipe) body: CreateApiDto,
  ) {
    const brandId = req.user.brand.id;

    return await this.apiKeyManagementService.createApiKey(brandId, body.name);
  }

  @UseGuards(BrandJwtStrategy)
  @Get()
  async getApiKeysByBrandId(@Req() req: any) {
    const brandId = req.user.brand.id;

    return await this.apiKeyManagementService.getApiKeysByBrandId(brandId);
  }

  @UseGuards(BrandJwtStrategy)
  @Delete(':id')
  async deleteApiKey(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
    const brandId = req.user.brand.id;

    return await this.apiKeyManagementService.deleteApiKey(id, brandId);
  }

  @UseGuards(ApiKeyJwtStrategy)
  @Get('/get-external-keys')
  async getMagicKey() {
    return {
      magicKey: process.env.MAGIC_KEY,
      rpcPolygonKey: process.env.RPC_POLYGON_KEY,
    };
  }

  @UseGuards(ApiKeyJwtStrategy)
  @Get('/brand')
  async checkApiKey(@Req() req: any) {
    return req.brand;
  }
}
