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
