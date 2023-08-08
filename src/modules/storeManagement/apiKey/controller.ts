import {
  Controller,
  UseInterceptors,
  UseGuards,
  Post,
  Get,
  Req,
} from '@nestjs/common';
import { ResponseInterceptor } from '@src/interceptors/response.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { ApiKeyManagementService } from './service';
import { BrandJwtStrategy } from '@src/middlewares/brand-jwt-strategy.middleware';
import { ApiKeyJwtStrategy } from '@src/middlewares/api-jwt-strategy.middleware';

@ApiTags('API Key')
@UseInterceptors(ResponseInterceptor)
@Controller('api_key')
export class ApiKeyManagementController {
  constructor(
    private readonly apiKeyManagementService: ApiKeyManagementService,
  ) {}

  @UseGuards(BrandJwtStrategy)
  @Post()
  async createApiKey(@Req() req: any) {
    const brandId = req.user.brand.id;

    return await this.apiKeyManagementService.createApiKey(brandId);
  }

  @UseGuards(BrandJwtStrategy)
  @Get()
  async getApiKeysByBrandId(@Req() req: any) {
    const brandId = req.user.brand.id;

    return await this.apiKeyManagementService.getApiKeysByBrandId(brandId);
  }

  @UseGuards(ApiKeyJwtStrategy)
  @Get('/get-external-keys')
  async getMagicKey() {
    return {
      magicKey: process.env.MAGIC_KEY,
      rpcPolygonKey: process.env.RPC_POLYGON_KEY,
    };
  }
}
