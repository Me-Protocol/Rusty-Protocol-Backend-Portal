import { Injectable } from '@nestjs/common';
import { KeyIdentifier } from './entities/keyIdentifier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KeyIdentifierType } from '@src/utils/enums/KeyIdentifierType';



@Injectable()
export class KeyManagementService {

  constructor(
    @InjectRepository(KeyIdentifier)
    private readonly keyIdentifierRepo: Repository<KeyIdentifier>,
  ) {
    
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
      return ""
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async decryptKey(encryptedKey: string): Promise<string> {
    try {
      
      return ""
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}
