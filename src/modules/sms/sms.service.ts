import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const { TWILIO_SID, TWILIO_TOKEN, TWILIO_MSG_SID } = process.env;
const accountSid = TWILIO_SID;
const authToken = TWILIO_TOKEN;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const twilio = require('twilio')(accountSid, authToken);

@Injectable()
export class SmsService {
  async sendSms(options: { to: string; body: string }): Promise<any> {
    try {
      return await twilio.messages
        .create({
          body: options.body,
          messagingServiceSid: TWILIO_MSG_SID,
          to: options.to,
        })
        .then((message: { sid: any }) => console.log(message.sid))
        .done();
    } catch (error) {
      throw new Error(error);
    }
  }
}
