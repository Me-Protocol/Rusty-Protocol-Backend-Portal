import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { AdminSettings } from './entities/admin_settings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyIdentifier } from '../key-management/entities/keyIdentifier.entity';
import { KeyManagementService } from '../key-management/key-management.service';
import { AuditTrailModule } from '../auditTrail/auditTrail.module';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { Device } from '../user/entities/device.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User, Device, AdminSettings, KeyIdentifier]), 
            AuditTrailModule],
  providers: [SettingsService, KeyManagementService, UserService],
  exports: [TypeOrmModule],
})
export class SettingsModule {
  constructor(private readonly settingsService: SettingsService) {}

  public async onModuleInit() {
    await this.settingsService.settingsInit();
  }
}