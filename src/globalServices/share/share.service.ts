import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Share } from './entities/share.entity';

@Injectable()
export class ShareService {
  constructor(
    @InjectRepository(Share)
    private readonly sharesRepository: Repository<Share>,
  ) {}

  async create(share: Share): Promise<Share> {
    return await this.sharesRepository.save(share);
  }

  async checkIfShared(offerId: string, userId: string) {
    const check = await this.sharesRepository.findOne({
      where: { offerId, userId },
    });

    if (check) {
      return true;
    } else {
      return false;
    }
  }
}
