import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse } from '@nestjs/swagger';
import { SettingsService } from './globalServices/settings/settings.service';
import { AuthGuard } from '@nestjs/passport';
import { APP_NAME, CLIENT_APP_URI } from './config/env.config';
import moment from 'moment';

@Controller()
export class AppController {
  constructor(private settingsService: SettingsService) {}

  /**
   * Below is used to send requests to built statically served Web frontend built with create-react-app
   * @param req
   * @param res
   * @returns
   */

  @ApiResponse({
    status: 200,
    description: `Me Protocol Api v0.0.1`,
  })
  @Get([''])
  sendWebFrontEnd() {
    return {
      serverName: APP_NAME,
      serverTime: moment().format('hh:mmA, DD MMM YYYY'),
      message: `You have followed a wrong link. Please go to ${CLIENT_APP_URI}`,
    };
  }

  @Get('/health')
  healthCheck() {
    return 'ok';
  }

  @UseGuards(AuthGuard())
  @Get('public-settings')
  async getPublicSettings() {
    return await this.settingsService.getPublicSettings();
  }
}
