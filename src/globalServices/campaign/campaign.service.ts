import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from './entities/campaign.entity';
import { Repository } from 'typeorm';
import { CampaignType } from '@src/utils/enums/CampaignType';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepo: Repository<Campaign>,
  ) {}

  async save(campaign: Campaign) {
    return this.campaignRepo.save(campaign);
  }

  async findById(id: string) {
    return this.campaignRepo.findOne({
      where: { id },
    });
  }

  async findByIdAndBrandId(id: string, brandId: string) {
    return this.campaignRepo.findOne({
      where: { id, brandId },
    });
  }

  async findByBrandId(brandId: string) {
    return this.campaignRepo.find({
      where: { brandId },
    });
  }

  async getActiveCampaigns(brandid: string) {
    return await this.campaignRepo.findOne({
      where: { brandId: brandid, active: true },
    });
  }

  async getAllActiveCampaigns() {
    return this.campaignRepo.find({
      where: { active: true, ended: false },
    });
  }

  async getBrandSignUpCampaign(brandId: string) {
    return this.campaignRepo.findOne({
      where: { brandId, type: CampaignType.SIGNUP_REWARD, active: true },
    });
  }
}
