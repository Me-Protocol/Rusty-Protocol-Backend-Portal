import { Injectable } from '@nestjs/common';
import { AdminSettings } from './entities/admin_settings.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { KeyManagementService } from '../key-management/key-management.service';
import { KeyIdentifier } from '../reward/entities/keyIdentifier.entity';
import { KeyIdentifierType } from '@src/utils/enums/KeyIdentifierType';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(AdminSettings)
    private readonly adminSettingsRepo: Repository<AdminSettings>,

    @InjectRepository(KeyIdentifier)
    private readonly keyIdentifierRepo: Repository<KeyIdentifier>,

    private readonly keyManagementService: KeyManagementService,
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

    if (
      !settings.meDispenser ||
      !settings.onboardWallet ||
      !settings.autoTopupWallet
    ) {
      settings.meDispenser = process.env.ME_DISPENSER;
      settings.onboardWallet = process.env.ONBOARD_WALLET;
      settings.autoTopupWallet = process.env.AUTO_TOPUP_WALLET;

      const encryptedKeyMeDispenser =
        await this.keyManagementService.encryptKey(settings.meDispenser);
      const encryptedKeyOnboardWallet =
        await this.keyManagementService.encryptKey(settings.onboardWallet);
      const encryptedKeyAutoTopupWallet =
        await this.keyManagementService.encryptKey(settings.autoTopupWallet);

      const keys = this.keyIdentifierRepo.create([
        {
          identifier: encryptedKeyMeDispenser,
          identifierType: KeyIdentifierType.PRIVATE_KEY,
        },
        {
          identifier: encryptedKeyOnboardWallet,
          identifierType: KeyIdentifierType.PRIVATE_KEY,
        },
        {
          identifier: encryptedKeyAutoTopupWallet,
          identifierType: KeyIdentifierType.PRIVATE_KEY,
        },
      ]);

      await this.keyIdentifierRepo.save(keys);
    }

    await this.adminSettingsRepo.save(settings);

    const adminSettings = await this.adminSettingsRepo.findOne({
      where: { isDefault: true },
    });

    const meDispenser = await this.keyManagementService.getEncryptedKey(
      settings.meDispenser,
      KeyIdentifierType.PRIVATE_KEY,
    );
    const onboardWallet = await this.keyManagementService.getEncryptedKey(
      settings.onboardWallet,
      KeyIdentifierType.PRIVATE_KEY,
    );
    const autoTopupWallet = await this.keyManagementService.getEncryptedKey(
      settings.autoTopupWallet,
      KeyIdentifierType.PRIVATE_KEY,
    );

    return {
      adminSettings,
      meDispenser,
      onboardWallet,
      autoTopupWallet,
    };
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
      autoTopupWallet,
      ...rest
    } = settings;

    return {
      ...rest,
    };
  }
}
