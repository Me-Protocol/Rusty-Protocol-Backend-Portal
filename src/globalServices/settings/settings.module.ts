import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { AdminSettings } from './entities/admin_settings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AdminSettings])],
  providers: [SettingsService],
  exports: [TypeOrmModule],
})
export class SettingsModule {
  constructor(private readonly settingsService: SettingsService) {}

  public async onModuleInit() {
    await this.settingsService.settingsInit();
  }
}
