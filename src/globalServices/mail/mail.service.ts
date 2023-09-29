import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { logger } from '../logger/logger.service';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(options: ISendMailOptions): Promise<any> {
    try {
      return await this.mailerService.sendMail({
        to: options.to,
        subject: options.subject,
        text: options.text,
        template: './mail.hbs',
        context: {
          message: options.html ?? options.text,
          subject: options.subject,
        },
      });
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new Error(error);
    }
  }
}
