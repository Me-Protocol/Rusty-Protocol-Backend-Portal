import { HttpException, Injectable } from '@nestjs/common';
import { ApiKeyService } from '@src/globalServices/api_key/api_key.service';

@Injectable()
export class ApiKeyManagementService {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  async createApiKey(brandId: string, name: string) {
    try {
      return await this.apiKeyService.createApiKey(brandId, name);
    } catch (error) {
      throw new HttpException(error.message, error.status, {
        cause: new Error(error.message),
      });
    }
  }

  async getApiKeysByBrandId(brandId: string) {
    return await this.apiKeyService.getApiKeysByBrandId(brandId);
  }

  async deleteApiKey(id: string, brandId: string) {
    const apiKey = await this.apiKeyService.get(id, brandId);

    if (!apiKey)
      throw new HttpException('Api key not found', 404, {
        cause: new Error('Api key not found'),
      });

    await this.apiKeyService.deleteApiKey(id, brandId);

    return {
      protocolPublicKey: apiKey.protocolPublicKey,
    };
  }
}
