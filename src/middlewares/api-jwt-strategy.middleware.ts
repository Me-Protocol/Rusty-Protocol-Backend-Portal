import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { BrandService } from '@src/globalServices/brand/brand.service';
import { ApiKeyService } from '@src/globalServices/api_key/api_key.service';

@Injectable()
export class ApiKeyJwtStrategy implements CanActivate {
  constructor(
    private brandService: BrandService,
    private apiKeyService: ApiKeyService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const headers = context.switchToHttp().getRequest().headers;
    const access_token = headers?.authorization?.split(' ')[1];

    if (!access_token)
      throw new UnauthorizedException('Invalid api key or api key is expired');

    const apiKey = await this.apiKeyService.getApiKeyByPrivateKey(access_token);

    if (!apiKey) {
      throw new UnauthorizedException('Invalid api key or api key is expired');
    }

    const brand = await this.brandService.getBrandById(apiKey.brandId);

    if (!brand) {
      throw new UnauthorizedException('Invalid api key or api key is expired');
    }

    request.brand = brand;
    request.apiKey = apiKey;

    return true;
  }
}
