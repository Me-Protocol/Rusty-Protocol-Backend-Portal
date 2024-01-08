import { Injectable } from '@nestjs/common';
import { AdminSettings } from './entities/admin_settings.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(AdminSettings)
    private readonly adminSettingsRepo: Repository<AdminSettings>,
  ) {}

  getCostSettings() {
    return this.adminSettingsRepo.findOne({
      where: { isDefault: true },
    });
  }

  async settingsInit() {
    let settings = await this.adminSettingsRepo.findOne({
      where: { isDefault: true },
    });

    if (!settings) {
      const adminSettings = new AdminSettings();
      settings = await this.adminSettingsRepo.save(adminSettings);
    }

    if (!settings.meDispenser || !settings.onboardWallet) {
      settings.meDispenser = process.env.ME_DISPENSER;
      settings.onboardWallet = process.env.ONBOARD_WALLET;
    }

    await this.adminSettingsRepo.save(settings);

    return await this.adminSettingsRepo.findOne({
      where: { isDefault: true },
    });
  }

  async getPublicSettings() {
    const settings = await this.adminSettingsRepo.findOne({
      where: { isDefault: true },
    });

    const {
      minimumBalanceApi,
      minimumBalanceInApp,
      topupAmountFactor,
      topupLimitFactor,
      isDefault,
      meDispenser,
      onboardWallet,
      ...rest
    } = settings;

    return {
      ...rest,
    };
  }
}
