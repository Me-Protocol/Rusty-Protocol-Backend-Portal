import { Injectable } from '@nestjs/common';
import { AdminSettings } from './entities/admin_settings.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { KeyManagementService } from '../key-management/key-management.service';
import { KeyIdentifier } from '../key-management/entities/keyIdentifier.entity';
import { KeyIdentifierType } from '@src/utils/enums/KeyIdentifierType';
import { generateWalletRandom } from '@developeruche/protocol-core';

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
        const encryptedKeyMeDispenserWallet = generateWalletRandom();
        const encryptedKeyOnboardWalletWallet = generateWalletRandom();
        const encryptedKeyAutoTopupWalletWallet = generateWalletRandom();

        const encryptedKeyMeDispenser =
          await this.keyManagementService.encryptKey(
            encryptedKeyMeDispenserWallet.privKey,
          );
        const encryptedKeyOnboardWallet =
          await this.keyManagementService.encryptKey(
            encryptedKeyOnboardWalletWallet.privKey,
          );
        const encryptedKeyAutoTopupWallet =
          await this.keyManagementService.encryptKey(
            encryptedKeyAutoTopupWalletWallet.privKey,
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
        settings.meDispenserPublicKey = encryptedKeyMeDispenserWallet.pubKey;
        settings.onboardWalletPublicKey =
          encryptedKeyOnboardWalletWallet.pubKey;
        settings.autoTopupWalletPublicKey =
          encryptedKeyAutoTopupWalletWallet.pubKey;
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
        ...adminSettings,
        adminSettings,
        meDispenser,
        onboardWallet,
        autoTopupWallet,
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
      meDispenserPublicKey,
      onboardWalletPublicKey,
      autoTopupWalletPublicKey,
      ...rest
    } = settings;

    return rest;
  }
}
