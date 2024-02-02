import { OnEvent } from '@nestjs/event-emitter';
import {
  CreateEmailNotificationEvent,
  CreatePhoneNotificationEvent,
  SEND_EMAIL_NOTIFICATION,
  SEND_PHONE_NOTIFICATION,
} from '@src/globalServices/notification/notification.event';
import { SmsService } from '@src/globalServices/sms/sms.service';
import { MailService } from '@src/globalServices/mail/mail.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationHandler {
  constructor(
    private readonly smsService: SmsService,
    private readonly mailService: MailService,
  ) {}

  @OnEvent(SEND_PHONE_NOTIFICATION)
  async handleCreatePhoneNotification(event: CreatePhoneNotificationEvent) {
    console.log('event listener for phone notification');
    console.log('event.phoneNumber', event.phoneNumber);
    await this.smsService.sendSms({
      to: event.phoneNumber,
      body: event.message,
    });
    return;
  }

  @OnEvent(SEND_EMAIL_NOTIFICATION)
  async handleCreateEmailNotification(event: CreateEmailNotificationEvent) {
    console.log('event listener for email notification');
    console.log('event.email', event.email);
    await this.mailService.sendMail({
      to: event.email,
      subject: event.title,
      text: event.message,
    });
    return;
  }
}
