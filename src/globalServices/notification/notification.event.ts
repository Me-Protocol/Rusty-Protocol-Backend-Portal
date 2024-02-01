import { Notification } from '@src/globalServices/notification/entities/notification.entity';

export const SEND_EMAIL_NOTIFICATION = 'notification.create.email';
export const SEND_PHONE_NOTIFICATION = 'notification.create.phone';

export class CreateEmailNotificationEvent {
  constructor(
    public readonly title: string,
    public readonly message: string,
    public readonly email: string,
  ) {}
}

export class CreatePhoneNotificationEvent {
  constructor(
    public readonly title: string,
    public readonly message: string,
    public readonly phoneNumber: string,
  ) {}
}
