import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from './entities/campaign.entity';
import { Repository } from 'typeorm';
import { CampaignType } from '@src/utils/enums/CampaignType';
import { CampaignStatus } from '@src/utils/enums/CampaignStatus';

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

  async findByBrandId(brandId: string, status: CampaignStatus) {
    return this.campaignRepo.find({
      where: { brandId, status },
    });
  }

  async getActiveCampaign(brandid: string) {
    return await this.campaignRepo.findOne({
      where: { brandId: brandid, status: CampaignStatus.ACTIVE },
    });
  }

  async getPendingCampaign(brandid: string) {
    return await this.campaignRepo.findOne({
      where: { brandId: brandid, status: CampaignStatus.PENDING },
    });
  }

  async getAllActiveCampaigns() {
    return this.campaignRepo.find({
      where: { status: CampaignStatus.ACTIVE },
    });
  }

  async getBrandSignUpCampaign(brandId: string) {
    return this.campaignRepo.findOne({
      where: {
        brandId,
        type: CampaignType.SIGNUP_REWARD,
        status: CampaignStatus.ACTIVE,
      },
    });
  }
}
