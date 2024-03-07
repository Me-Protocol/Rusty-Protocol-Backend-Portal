import { Injectable } from '@nestjs/common';
import { KMS } from 'aws-sdk';
import { KeyIdentifier } from './entities/keyIdentifier.entity';
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
      accessKeyId: AWS_ACCESS_KEY_ID,
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
    try {
      const keyIdentifier = await this.getKeyIdentifier(id, type);
      return await this.decryptKey(keyIdentifier.identifier);
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async encryptKey(privateKey: string): Promise<string> {
    try {
      const params = {
        KeyId: 'mrk-9a19daa3db02435195457c71c327d992',
        Plaintext: privateKey,
      };

      const result = await this.kms.encrypt(params).promise();
      return result.CiphertextBlob.toString('base64');
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async decryptKey(encryptedKey: string): Promise<string> {
    try {
      const params = {
        CiphertextBlob: Buffer.from(encryptedKey, 'base64'),
        KeyId: AWS_KMS_KEY_ID,
      };

      const result = await this.kms.decrypt(params).promise();
      return result.Plaintext.toString('utf-8');
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}
