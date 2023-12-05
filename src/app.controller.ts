import {Controller, Get, Request, Res, UseGuards, Response, Render} from '@nestjs/common';
import {AppService} from './app.service';
import {ApiResponse} from '@nestjs/swagger';
import {SettingsService} from './globalServices/settings/settings.service';
import {AuthGuard} from '@nestjs/passport';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private settingsService: SettingsService,
    ) {
    }

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
    sendWebFrontEnd(@Request() req, @Response() res) {
        return this.appService.sendWebFrontEnd(req, res);
    }

    @Get("/health")
    healthCheck() {
        return "ok";
    }


    @UseGuards(AuthGuard())
    @Get('public-settings')
    async getPublicSettings() {
        return await this.settingsService.getPublicSettings();
    }
}
