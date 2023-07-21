import { Injectable } from '@nestjs/common';
import { ApiKeyService } from '@src/globalServices/api_key/api_key.service';

@Injectable()
export class ApiKeyManagementService {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  async createApiKey(brandId: string) {
    return await this.apiKeyService.createApiKey(brandId);
  }

  async getApiKeysByBrandId(brandId: string) {
    return await this.apiKeyService.getApiKeysByBrandId(brandId);
  }
}
