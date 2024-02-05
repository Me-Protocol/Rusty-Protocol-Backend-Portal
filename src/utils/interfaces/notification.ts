import { NotificationType } from '@src/utils/enums/notification.enum';

export interface ISendBulkNotification {
  notification_type: 'email' | 'phone';
  type: NotificationType;
  title: string;
  message: string;
  emailMessage?: string;
  icon?: string;
  image?: string;
  orderId?: string;
}

export interface ISendNotification {
  notification_type: 'email' | 'phone';
  identifier: string;
  type: NotificationType;
  title: string;
  message: string;
  emailMessage?: string;
  icon?: string;
  image?: string;
  orderId?: string;
}
