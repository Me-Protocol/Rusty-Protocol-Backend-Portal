import { Injectable } from '@nestjs/common';
import { KMS } from 'aws-sdk';
import { KeyIdentifier } from '../reward/entities/keyIdentifier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KeyIdentifierType } from '@src/utils/enums/KeyIdentifierType';

const { AWS_KMS_KEY_ID, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } =
  process.env;

@Injectable()
export class KeyManagementService {
  private readonly kms: KMS;

  constructor(
    @InjectRepository(KeyIdentifier)
    private readonly keyIdentifierRepo: Repository<KeyIdentifier>,
  ) {
    this.kms = new KMS({
      accessKeyId: 'AKIAT2ZH47NPLUBE2L73',
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      region: AWS_REGION,
    });
  }

  async createKeyIdentifer(
    keyIdentifier: KeyIdentifier,
  ): Promise<KeyIdentifier> {
    return this.keyIdentifierRepo.save(keyIdentifier);
  }

  async getKeyIdentifier(id: string, type: KeyIdentifierType) {
    return this.keyIdentifierRepo.findOne({
      where: {
        id,
        identifierType: type,
      },
    });
  }

  async getEncryptedKey(id: string, type: KeyIdentifierType) {
    const keyIdentifier = await this.getKeyIdentifier(id, type);
    return await this.decryptKey(keyIdentifier.identifier);
  }

  async encryptKey(privateKey: string): Promise<string> {
    const params = {
      KeyId: AWS_KMS_KEY_ID,
      Plaintext: privateKey,
    };

    const result = await this.kms.encrypt(params).promise();
    return result.CiphertextBlob.toString('base64');
  }

  async decryptKey(encryptedKey: string): Promise<string> {
    const params = {
      CiphertextBlob: Buffer.from(encryptedKey, 'base64'),
    };

    const result = await this.kms.decrypt(params).promise();
    return result.Plaintext.toString('utf-8');
  }
}
