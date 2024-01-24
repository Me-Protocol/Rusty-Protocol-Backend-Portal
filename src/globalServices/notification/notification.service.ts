import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { UserService } from '../user/user.service';
import { Notification } from './entities/notification.entity';
import { FilterNotificationDto } from '@src/modules/notification/dto/FilterNotificationDto.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,

    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  // create notification
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
    const notification = await this.notificationRepository.findOne({
      where: {
        id,
        userId,
      },
      relations: ['offers', 'rewards', 'brands'],
    });

    if (!notification) {
      throw new HttpException('Notification not found', 404);
    }

    notification.isRead = true;
    await this.notificationRepository.save(notification);

    return notification;
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
