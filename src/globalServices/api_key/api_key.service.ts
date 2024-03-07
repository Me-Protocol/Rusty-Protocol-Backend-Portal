import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKey } from './entities/api_key.entity';
import { generateWalletWithApiKey } from '@developeruche/protocol-core';
import { KeyManagementService } from '../key-management/key-management.service';
import { RewardService } from '../reward/reward.service';
import { KeyIdentifier } from '../reward/entities/keyIdentifier.entity';
import { KeyIdentifierType } from '@src/utils/enums/KeyIdentifierType';
import { SyncRewardService } from '../reward/sync/sync.service';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectRepository(ApiKey)
    private readonly apiKeyRepository: Repository<ApiKey>,

    private readonly keyManagementService: KeyManagementService,
  ) {}

  private generateHash(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  async createApiKey(brandId: string, name: string): Promise<ApiKey> {
    const privateKeyHash = this.generateHash();

    const { privKey, pubKey } = generateWalletWithApiKey(
      privateKeyHash,
      process.env.API_KEY_SALT,
    );

    const encryptedKey = await this.keyManagementService.encryptKey(privKey);

    const keyIdentifier = new KeyIdentifier();
    keyIdentifier.identifier = encryptedKey;
    keyIdentifier.identifierType = KeyIdentifierType.API_KEY;

    const newKeyIdentifier = await this.keyManagementService.createKeyIdentifer(
      keyIdentifier,
    );

    const apiKey = new ApiKey();
    apiKey.brandId = brandId;
    apiKey.publicKey = this.generateHash();
    apiKey.privateKey = privateKeyHash;
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

  async get(id: string, brandId: string): Promise<ApiKey> {
    return await this.apiKeyRepository.findOne({
      where: {
        id,
        brandId,
      },
    });
  }
}
