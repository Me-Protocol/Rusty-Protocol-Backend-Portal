import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

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
          message: options.html,
          subject: options.subject,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
