import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenReward } from './models/tokenreward.entity';

@Injectable()
export class TokenrewardService {
  constructor(
    @InjectRepository(TokenReward)
    private readonly tokenRepo: Repository<TokenReward>,
  ) {}

  async findTokenByContractAddress(contractAddress: string) {
    return await this.tokenRepo.findOne({
      where: {
        contractAddress,
      },
    });
  }

  async findTokenBySymbol(symbol: string) {
    return await this.tokenRepo.findOne({
      where: {
        symbol,
      },
    });
  }

  async findTokenById(id: string) {
    return await this.tokenRepo.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByName(name: string) {
    return await this.tokenRepo.findOne({
      where: {
        rewardName: name,
      },
    });
  }

  async findAllTokens() {
    return await this.tokenRepo.find();
  }

  async createToken(data: TokenReward) {
    const token = await this.tokenRepo.save(data);

    return token;
  }

  async updateToken(id: string, data: any) {
    return this.tokenRepo.update(
      {
        rewardId: id,
      },
      data,
    );
  }
}
