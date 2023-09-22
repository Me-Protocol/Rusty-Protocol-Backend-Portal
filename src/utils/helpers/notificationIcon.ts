import { NotificationType } from '../enums/notification.enum';

export const notificationIcon = (type: NotificationType) => {
  switch (type) {
    case NotificationType.EXPIRING:
      return process.env.EXPIRING_NOTIFICATION_ICON;
    default:
      return process.env.DEFAULT_NOTIFICATION_ICON;
  }
};
