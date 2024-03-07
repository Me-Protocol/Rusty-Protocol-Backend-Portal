import { Injectable } from '@nestjs/common';
import { AdminSettings } from './entities/admin_settings.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { KeyManagementService } from '../key-management/key-management.service';
import { KeyIdentifier } from '../key-management/entities/keyIdentifier.entity';
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
    try {
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
        const encryptedKeyMeDispenser =
          await this.keyManagementService.encryptKey(process.env.ME_DISPENSER);
        const encryptedKeyOnboardWallet =
          await this.keyManagementService.encryptKey(
            process.env.ONBOARD_WALLET,
          );
        const encryptedKeyAutoTopupWallet =
          await this.keyManagementService.encryptKey(
            process.env.AUTO_TOPUP_WALLET,
          );

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

        const keysIds = await this.keyIdentifierRepo.save(keys);

        settings.meDispenser = keysIds[0].id;
        settings.onboardWallet = keysIds[1].id;
        settings.autoTopupWallet = keysIds[2].id;
      }

      await this.adminSettingsRepo.save(settings);

      const adminSettings = await this.adminSettingsRepo.findOne({
        where: { isDefault: true },
      });

      const meDispenser = await this.keyManagementService.getEncryptedKey(
        adminSettings.meDispenser,
        KeyIdentifierType.PRIVATE_KEY,
      );
      const onboardWallet = await this.keyManagementService.getEncryptedKey(
        adminSettings.onboardWallet,
        KeyIdentifierType.PRIVATE_KEY,
      );
      const autoTopupWallet = await this.keyManagementService.getEncryptedKey(
        adminSettings.autoTopupWallet,
        KeyIdentifierType.PRIVATE_KEY,
      );

      return {
        adminSettings,
        meDispenser,
        onboardWallet,
        autoTopupWallet,
        ...adminSettings,
      };
    } catch (error) {
      console.log('Error in settingsInit', error);
      throw new Error(error);
    }
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
