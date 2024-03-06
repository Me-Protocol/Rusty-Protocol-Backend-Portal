import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { UserService } from '../user/user.service';
import { Notification } from './entities/notification.entity';
import { FilterNotificationDto } from '@src/modules/notification/dto/FilterNotificationDto.dto';
import { BrandService } from '@src/globalServices/brand/brand.service';
import {
  ISendBulkNotification,
  ISendNotification,
} from '@src/utils/interfaces/notification';
import { SmsService } from '@src/globalServices/sms/sms.service';
import { NotificationHandler } from '@src/globalServices/notification/notification.handler';
import { EventEmitter } from '@node_modules/typeorm/browser/platform/BrowserPlatformTools';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  CreateEmailNotificationEvent,
  CreatePhoneNotificationEvent,
  SEND_EMAIL_NOTIFICATION,
  SEND_PHONE_NOTIFICATION,
} from '@src/globalServices/notification/notification.event';
import { User } from '@src/globalServices/user/entities/user.entity';
import { NotificationType } from '@src/utils/enums/notification.enum';
import {
  logger,
  LoggerService,
} from '@src/globalServices/logger/logger.service';
import { SyncIdentifierType } from '@src/utils/enums/SyncIdentifierType';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly brandService: BrandService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async sendBulkNotification(
    brandId: string,
    notification: ISendBulkNotification,
  ) {
    const { emailUsers, phoneUsers } =
      await this.brandService.getActiveBrandCustomers(brandId);
    console.log(
      `Sending bulk notification to ${emailUsers.length} email users and ${phoneUsers.length} phone users`,
    );

    let notifications: Partial<Notification>[] = [];

    if (notification.notification_type === 'email') {
      notifications = this.createEmailNotifications(notification, emailUsers);
    } else if (notification.notification_type === 'phone') {
      notifications = this.createPhoneNotifications(notification, phoneUsers);
    }

    await this.saveNotifications(notifications);
    return;
  }

  async sendNotificationToUser(
    brandId: string,
    notification: ISendNotification,
  ) {
    const user = await this.brandService.getActiveBrandCustomer(
      brandId,
      notification.identifier,
      notification.notification_type as SyncIdentifierType,
    );

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    let notifications: Partial<Notification>[] = [];

    if (notification.notification_type === 'email') {
      notifications = this.createEmailNotifications(notification, [user]);
    } else if (notification.notification_type === 'phone') {
      notifications = this.createPhoneNotifications(notification, [user]);
    }

    await this.saveNotifications(notifications);
    return;
  }

  private createEmailNotifications(
    notification: ISendBulkNotification | ISendNotification,
    emailUsers: User[],
  ): Partial<Notification>[] {
    return emailUsers.map((user) => {
      const createdNotification = this.createNotificationObject(
        notification,
        user,
      );

      this.eventEmitter.emit(
        SEND_EMAIL_NOTIFICATION,
        new CreateEmailNotificationEvent(
          createdNotification.title,
          createdNotification.emailMessage,
          user.email,
        ),
      );
      console.log(`Sending email notification to ${user.email}`);
      console.log(`Notification: ${JSON.stringify(createdNotification)}`);
      return createdNotification;
    });
  }

  private createPhoneNotifications(
    notification: ISendBulkNotification,
    phoneUsers: User[],
  ): Partial<Notification>[] {
    return phoneUsers.map((user) => {
      const createdNotification = this.createNotificationObject(
        notification,
        user,
      );
      this.eventEmitter.emit(
        SEND_PHONE_NOTIFICATION,
        new CreatePhoneNotificationEvent(
          createdNotification.title,
          createdNotification.message,
          user.phone,
        ),
      );
      console.log(`Sending phone notification to ${user.phone}`);
      console.log(`Notification: ${JSON.stringify(createdNotification)}`);
      return createdNotification;
    });
  }

  private createNotificationObject(
    notification: ISendBulkNotification,
    user: User,
  ): Partial<Notification> {
    return {
      type: notification.type,
      title: notification.title,
      message: notification.message,
      emailMessage:
        notification.emailMessage.length > 0
          ? notification.emailMessage
          : notification.message,
      userId: user.id,
      icon: notification.icon || null,
      orderId: notification.orderId || null,
      image: notification.image || null,
    };
  }

  private async saveNotifications(
    notifications: Partial<Notification>[],
  ): Promise<void> {
    await this.notificationRepository.insert(notifications);
  }

  async createNotification(notification: Notification) {
    const user_id = notification.userId;
    const user = await this.userService.getUserById(user_id);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const notif = await this.notificationRepository.save(notification);

    if (notification.emailMessage) {
      await this.mailService.sendMail({
        to: user.email,
        subject: notification.title,
        text: notification.emailMessage,
      });
    }

    console.log('notif', notif);

    return notif;
  }

  // get all notifications
  async getAllNotifications(query: FilterNotificationDto) {
    const { userId, page, limit, types } = query;

    const notificationQuery = this.notificationRepository
      .createQueryBuilder('notification')
      .where('notification.userId = :userId', { userId })
      .orderBy('notification.createdAt', 'DESC')
      .leftJoinAndSelect('notification.offers', 'offers')
      .leftJoinAndSelect('notification.rewards', 'rewards')
      .leftJoinAndSelect('notification.brands', 'brands');

    if (types && types.length > 0) {
      notificationQuery.andWhere('notification.type IN (:...types)', {
        types,
      });
    }

    const skip = (page - 1) * limit;

    notificationQuery.skip(skip).take(limit);

    const notifications = await notificationQuery.getMany();
    const total = await notificationQuery.getCount();

    return {
      notifications,
      total,
      nextPage: total > page * limit ? Number(page) + 1 : null,
      previousPage: page > 1 ? Number(page) - 1 : null,
    };
  }

  // get notification by id
  async getNotificationById(id: string, userId: string) {
    try {
      const notification = await this.notificationRepository.findOne({
        where: {
          id,
          userId,
        },
      });

      if (!notification) {
        throw new HttpException('Notification not found', 404);
      }

      notification.isRead = true;
      await this.notificationRepository.save(notification);

      return notification;
    } catch (error) {
      console.log(error);
      logger.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  // update notification
  async updateNotification(id: string, notification: Notification) {
    return await this.notificationRepository.update(id, notification);
  }

  // delete notification
  async deleteNotification(id: string, userId: string) {
    const checkNotification = await this.notificationRepository.findOneBy({
      id,
      userId,
    });

    if (!checkNotification) {
      throw new HttpException('Notification not found', 404);
    }

    return await this.notificationRepository.softDelete(id);
  }

  async clearAllNotifications(userId: string) {
    return await this.notificationRepository.softDelete({ userId });
  }
}
