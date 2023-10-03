import { Controller, Get, Request, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { AppService } from './app.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
}
