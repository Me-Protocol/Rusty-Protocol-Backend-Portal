import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { AdminSettings } from './entities/admin_settings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyIdentifier } from '../key-management/entities/keyIdentifier.entity';
import { KeyManagementService } from '../key-management/key-management.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminSettings, KeyIdentifier])],
  providers: [SettingsService, KeyManagementService],
  exports: [TypeOrmModule],
})
export class SettingsModule {
  constructor(private readonly settingsService: SettingsService) {}

  public async onModuleInit() {
    await this.settingsService.settingsInit();
  }
}