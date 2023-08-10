import { Injectable } from '@nestjs/common';

@Injectable()
export class SettingsService {
  getCostSettings() {
    const minimumBalanceApi = 500;
    const minimumBalanceInApp = 100;
    const topupAmountFactor = 4;
    const topupLimitFactor = 1.2;

    return {
      minimumBalanceApi,
      minimumBalanceInApp,
      topupAmountFactor,
      topupLimitFactor,
    };
  }
}
