import { Injectable } from '@nestjs/common';
import { KMS } from 'aws-sdk';

@Injectable()
export class KeyManagementService {
  private readonly kms: KMS;

  constructor() {
    this.kms = new KMS({
      accessKeyId: 'AKCVBTRNOSMLTIA7RPQQ', //credentials for your IAM user
      secretAccessKey: 'lJQtdIfH/Cup9AyaaHV8h2NnR/eKFIsZea5Vn0k', //credentials for your IAM user
      region: 'ap-southeast-1',
    });
  }

  async encryptKey(privateKey: string): Promise<string> {
    const kmsKeyId = process.env.KMS_KEY_ID;
    const params = {
      KeyId: kmsKeyId,
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
