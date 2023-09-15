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
    const settings = await this.adminSettingsRepo.findOne({
      where: { isDefault: true },
    });

    if (!settings) {
      const adminSettings = new AdminSettings();
      await this.adminSettingsRepo.save(adminSettings);
    }

    return await this.adminSettingsRepo.findOne({
      where: { isDefault: true },
    });
  }
}
