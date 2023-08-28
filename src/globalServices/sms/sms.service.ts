import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { logger } from '../logger/logger.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const { TWILIO_SID, TWILIO_TOKEN } = process.env;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const twilio = require('twilio')(TWILIO_SID, TWILIO_TOKEN);

@Injectable()
export class SmsService {
  constructor(private configService: ConfigService) {}

  async sendSms(options: { to: string; body: string }): Promise<any> {
    try {
      return await twilio.messages
        .create({
          body: options.body,
          messagingServiceSid: this.configService.get('TWILIO_MSG_SID'),
          to: options.to,
        })
        .then((message: { sid: any }) => console.log(message.sid))
        .done();
    } catch (error) {
      logger.error(error);
      throw new Error(error);
    }
  }
}
