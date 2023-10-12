/* eslint-disable prefer-const */
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import moment from 'moment';
import { Cron, CronExpression } from '@nestjs/schedule';
import { readFile } from 'fs/promises';
import { HttpService } from '@nestjs/axios';
import { TaskStatus } from '@src/utils/enums/TasksTypes';
import { NotificationType } from '@src/utils/enums/notification.enum';
import { emailButton } from '@src/utils/helpers/email';
import { CLIENT_APP_URI } from '@src/config/env.config';
import { NotificationService } from '@src/globalServices/notification/notification.service';
import { FollowService } from '@src/globalServices/follow/follow.service';
import { BrandService } from '@src/globalServices/brand/brand.service';
import { TaskResponseRecord } from '../../entities/taskResponseRecord.entity';
import { Task } from '../../entities/task.entity';
import { Notification } from '@src/globalServices/notification/entities/notification.entity';
export const { TASK_QUEUE } = process.env;

@Injectable()
export class TaskScheduleService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,

    @InjectRepository(TaskResponseRecord)
    private taskResponseRecordRepo: Repository<TaskResponseRecord>,

    private readonly httpService: HttpService,

    private readonly brandService: BrandService,

    private readonly followService: FollowService,

    private readonly notificationService: NotificationService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async fundJob() {
    // get one record with no escrow address
    const record = await this.taskResponseRecordRepo.findOne({
      where: { isFunded: false },
    });

    if (record) {
      if (record.isReady && record.escrowUpdated) {
        const localUrl = `./public/uploads/manifests/${record.manifestHash}.json`;
        const data = await readFile(localUrl, 'utf8');

        const mani = JSON.parse(data);

        const fundJob = await this.httpService.axiosRef.post(
          `${process.env.JOB_LAUNCHER_URL}/joblauncher/fundJob`,
          {
            escrowAddress: record.escrowAddress,
            amount: `${mani.price}`,
          },
        );

        if (fundJob.status >= 200 && fundJob.status < 300) {
          record.isFunded = true;
          console.log('Job was funded');
          return await this.taskResponseRecordRepo.save(record);
        }
      }
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async sendNotificationOfNewActiveTasks() {
    const tasks = await this.taskRepository.find({
      relations: ['brand', 'reward'],
      where: {
        status: TaskStatus.ACTIVE,
        notificationSent: false,
      },
    });

    if (tasks.length > 0) {
      for (let index = 0; index < tasks.length; index++) {
        const task = tasks[index];

        const brand = await this.brandService.getBrandById(task.brand.id);

        if (brand) {
          // find brand followers
          const followers = await this.followService.getAllBrandFollowers(
            brand.id,
          );

          if (followers.length > 0) {
            for (let index = 0; index < followers.length; index++) {
              const follower = followers[index];

              const notification = new Notification();
              notification.userId = follower.userId as any;
              notification.message = `New task available for ${task.reward.rewardSymbol}. Join now to earn`;
              notification.type = NotificationType.POINT;
              notification.rewards = [task.reward];
              notification.title = 'New task available';

              notification.emailMessage = `
              <p>Hi ${follower?.user?.customer?.name},</p>
              <p>There is a new task available for ${
                task.reward.rewardName
              }.</p>
              ${emailButton({
                url: `${CLIENT_APP_URI}/tasks`,
                text: 'Join now to earn.',
              })}
              <p>Regards,</p>
              `;

              if (notification) {
                await this.notificationService.createNotification(notification);
              }
            }

            await this.taskRepository.update(task.id, {
              notificationSent: true,
            });
          }
        }
      }
    }
  }

  //expire tasks
  @Cron(CronExpression.EVERY_2ND_HOUR)
  async expireTask() {
    try {
      const activeTasks = await this.taskRepository.find({
        relations: ['brand', 'reward'],
        where: { status: TaskStatus.ACTIVE },
      });

      if (!activeTasks || activeTasks.length < 1) return;

      for (let index = 0; index < activeTasks.length; index++) {
        const activeTask = activeTasks[index];

        // check if time frame has elapsed
        const targetEndTime = moment(activeTask.startDate).add(
          activeTask.timeFrameInHours,
          'hours',
        );
        const isValid = moment().isAfter(targetEndTime);

        if (!isValid) continue;

        await this.taskRepository.update(activeTask.id, {
          expired: true,
        });
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }
}
