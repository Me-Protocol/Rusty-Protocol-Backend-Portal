import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKey } from './entities/api_key.entity';
import {
  generateWalletRandom,
  generateWalletWithApiKey,
} from '@developeruche/protocol-core';
import { KeyManagementService } from '../key-management/key-management.service';
import { RewardService } from '../reward/reward.service';
import { KeyIdentifier } from '../reward/entities/keyIdentifier.entity';
import { KeyIdentifierType } from '@src/utils/enums/KeyIdentifierType';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectRepository(ApiKey)
    private readonly apiKeyRepository: Repository<ApiKey>,

    private readonly keyManagementService: KeyManagementService,
    private readonly rewardService: RewardService,
  ) {}

  private generateHash(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  async createApiKey(brandId: string, name: string): Promise<ApiKey> {
    const publicKeyHash = this.generateHash();

    const { privKey, pubKey } = generateWalletWithApiKey(
      publicKeyHash,
      process.env.API_KEY_SALT,
    );

    const encryptedKey = await this.keyManagementService.encryptKey(privKey);

    const keyIdentifier = new KeyIdentifier();
    keyIdentifier.identifier = encryptedKey;
    keyIdentifier.identifierType = KeyIdentifierType.API_KEY;

    const newKeyIdentifier = await this.rewardService.createKeyIdentifer(
      keyIdentifier,
    );

    const apiKey = new ApiKey();

    apiKey.brandId = brandId;
    apiKey.publicKey = publicKeyHash;
    apiKey.privateKey = this.generateHash();
    apiKey.name = name;
    apiKey.keyIdentifierId = newKeyIdentifier.id;
    apiKey.protocolPublicKey = pubKey;

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
    await this.apiKeyRepository.softDelete({
      id,
      brandId,
    });
  }
}
