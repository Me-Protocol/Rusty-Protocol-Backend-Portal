import { Injectable } from '@nestjs/common';
import { KMS } from 'aws-sdk';

const { AWS_KMS_KEY_ID, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } =
  process.env;

@Injectable()
export class KeyManagementService {
  private readonly kms: KMS;

  constructor() {
    this.kms = new KMS({
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      region: AWS_REGION,
    });
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
