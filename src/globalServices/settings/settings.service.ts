import { Injectable } from '@nestjs/common';

@Injectable()
export class SettingsService {
  getCostSettings() {
    const minimumBalanceApi = 5000;
    const minimumBalanceInApp = 1000;
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
