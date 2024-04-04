import { Controller, UseGuards, Get, Put, Body, Req } from '@nestjs/common';
import { AdminJwtStrategy } from '@src/middlewares/admin-jwt-strategy.middleware';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SettingsService } from '@src/globalServices/settings/settings.service';
import { UpdateSettingsDto } from './dto/UpdateSettingsDto.dto';

@ApiTags('settings')
@Controller('settings')
@ApiBearerAuth()
export class SettingsModuleController {
  constructor(private readonly settingsService: SettingsService) {}

  @UseGuards(AdminJwtStrategy)
  @Get('admin-settings')
  async getPublicSettings() {
    return await this.settingsService.getPublicSettings();
  }

  @UseGuards(AdminJwtStrategy)
  @Put('admin-settings')
  async updateSettings(@Body() updateDto: UpdateSettingsDto, @Req() req: any) {
    const userId = req.user.id
    return await this.settingsService.updateSettings(updateDto, userId);
  }
}
