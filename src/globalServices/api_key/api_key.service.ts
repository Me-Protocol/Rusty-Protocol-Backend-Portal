import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKey } from './entities/api_key.entity';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectRepository(ApiKey)
    private readonly apiKeyRepository: Repository<ApiKey>,
  ) {}

  private generateHash(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  async createApiKey(brandId: string, name: string): Promise<ApiKey> {
    const apiKey = new ApiKey();

    apiKey.brandId = brandId;
    apiKey.publicKey = this.generateHash();
    apiKey.privateKey = this.generateHash();
    apiKey.name = name;

    return await this.apiKeyRepository.save(apiKey);
  }

  async getApiKeysByBrandId(brandId: string): Promise<ApiKey[]> {
    return await this.apiKeyRepository.find({
      where: {
        brandId,
      },
    });
  }

  async getApiKeyByPublicKey(publicKey: string): Promise<ApiKey> {
    return await this.apiKeyRepository.findOne({
      where: {
        publicKey,
      },
    });
  }

  async getApiKeyByPrivateKey(privateKey: string): Promise<ApiKey> {
    return await this.apiKeyRepository.findOne({
      where: {
        privateKey,
      },
    });
  }

  async deleteApiKey(id: string, brandId: string): Promise<void> {
    await this.apiKeyRepository.delete({
      id,
      brandId,
    });
  }
}
