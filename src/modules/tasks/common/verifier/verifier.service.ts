import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Client } = require('twitter-api-sdk');

const { TWITTER_BREARER_TOKEN } = process.env;

const client = new Client(TWITTER_BREARER_TOKEN);

@Injectable()
export class TasksResultService {
  constructor() {}

  // @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async checkAvailableBounty() {
    // call blockchain to check available bounty
    //   const lastBountyRecord = await this.bountyRecordRepo.findOne({
    //     order: {
    //       created_at: 'DESC',
    //     },
    //   });
    //   if (lastBountyRecord) {
    //     const block = await this.web3Service.getHash(lastBountyRecord.block_number);
    //     if (block) {
    //       const blockNumber = block.number;
    //       const blockHash = block.hash;
    //       const blockTime = block.timestamp;
    //       const availableBounty = await this.web3Service.getAvailableBounty();
    //       const bountyRecord = this.bountyRecordRepo.create({
    //         block_number: blockNumber,
    //         block_hash: blockHash,
    //         block_time: blockTime,
    //         available_bounty: availableBounty,
    //       });
    //       await this.bountyRecordRepo.save(bountyRecord);
    //     }
  }

  // @Cron(CronExpression.EVERY_WEEK)
  // async deleteOldBountyRecords() {
  //   // delete old bounty records
  //   const bountyRecords = await this.bountyRecordRepo.find({
  //     order: {
  //       created_at: 'DESC',
  //     },
  //   });

  //   if (bountyRecords.length > 2) {
  //     const recordsToDelete = bountyRecords.slice(2);
  //     await this.bountyRecordRepo.remove(recordsToDelete);
  //   }
  // }

  // expire tasks that the time frame has elapsed
  // @Cron(CronExpression.EVERY_MINUTE)
  async expireTasks() {
    // const activeTasks = await this.taskRepository.find({
    //   relations: ['brand', 'token'],
    //   where: { status: TaskStatus.ACTIVE },
    // });
    // for (let index = 0; index < activeTasks.length; index++) {
    //   const activeTask = activeTasks[index];
    //   if (activeTask) {
    //     // check if time frame has elapsed
    //     const isValid = moment().isBetween(
    //       moment(activeTask.created_at).subtract(1, 'hours'),
    //       moment(activeTask.created_at).add(
    //         activeTask.time_frame_in_hours,
    //         'hours',
    //       ),
    //     );
    //     if (!isValid) {
    //       // send response to job launcher
    //       activeTask.expired = true;
    //       await this.taskRepository.save(activeTask);
    //     }
    //   }
    // }
  }

  // @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async sendNotificationOfNewActiveTasks() {
    // const tasks = await this.taskRepository.find({
    //   relations: ['brand', 'token', 'token.reward'],
    //   where: {
    //     status: TaskStatus.ACTIVE,
    //     notification_sent: false,
    //   },
    // });
    // if (tasks.length > 0) {
    //   for (let index = 0; index < tasks.length; index++) {
    //     const task = tasks[index];
    //     const brand = await this.brandService.findOneByBrandId(task.brand.id);
    //     if (brand) {
    //       // find brand followers
    //       const followers = await this.followService.getBrandsFollowers(
    //         brand.id as any,
    //       );
    //       if (followers.length > 0) {
    //         for (let index = 0; index < followers.length; index++) {
    //           const follower = followers[index];
    //           const notification = new NotificationEntity();
    //           notification.user_id = follower.follower_id as any;
    //           notification.message = `New task available for ${task.token.symbol}. Join now to earn`;
    //           notification.type = NotificationType.POINT;
    //           notification.rewards = [task.token.reward];
    //           notification.title = 'New task available';
    //           notification.emailMessage = `
    //           <p>Hi ${follower.follower.firstName},</p>
    //           <p>There is a new task available for ${task.token.symbol}.</p>
    //           <p>Join now to earn.</p>
    //           <p>Regards,</p>
    //           `;
    //           if (notification) {
    //             await this.notificationService.createNotification(notification);
    //           }
    //         }
    //         await this.taskRepository.update(task.id, {
    //           notification_sent: true,
    //         });
    //       }
    //     }
    //   }
    // }
  }
}
