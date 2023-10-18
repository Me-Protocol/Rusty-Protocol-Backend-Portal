import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { AppService } from './app.service';
import { ApiResponse } from '@nestjs/swagger';
import { SettingsService } from './globalServices/settings/settings.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private settingsService: SettingsService,
  ) {}

  /**
   * Below is used to send requests to built statically served Web frontend built with create-react-app
   * @param req
   * @param reply
   * @returns
   */
  @ApiResponse({
    status: 200,
    description: `Me Protocol Api v0.0.1`,
  })
  @Get(['', '*'])
  sendWebFrontEnd(@Request() req: Request, @Res() reply: FastifyReply) {
    return this.appService.sendWebFrontEnd(req, reply);
  }

  @UseGuards(AuthGuard())
  @Get('public-settings')
  async getPublicSettings() {
    return await this.settingsService.getPublicSettings();
  }
}
