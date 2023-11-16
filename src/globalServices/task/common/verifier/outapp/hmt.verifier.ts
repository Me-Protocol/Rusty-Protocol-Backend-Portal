/*
  @@NOTE
  job_total_tasks = count of datapoints. mandatory only in taskdata_uri case, eg. Total number of reviews to be submitted to human protocol

*/

import { InjectRepository } from '@nestjs/typeorm';
import { HMT_JOB_API_KEY } from '@src/config/env.config';
import { Task } from '@src/globalServices/task/entities/task.entity';
import { TaskResponder } from '@src/globalServices/task/entities/taskResponder.entity';
import { TaskResponse } from '@src/globalServices/task/entities/taskResponse.entity';
import { TaskResponseRecord } from '@src/globalServices/task/entities/taskResponseRecord.entity';
import axios from 'axios';
import { Repository } from 'typeorm';
import { UpdateTaskResponseDto } from '@src/modules/taskModule/dtos/tasks.dto';
import { TaskStatus } from '@src/utils/enums/TasksTypes';
import { HttpException } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { constructHmtManifest } from '../../constructHmtManifest';
import { createReadStream, readFileSync } from 'fs';
import path from 'path';
const FormData = require('form-data');

export class HMTTaskVerifier {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,

    @InjectRepository(TaskResponse)
    private taskResponseRepository: Repository<TaskResponse>,

    @InjectRepository(TaskResponseRecord)
    private taskResponseRecordRepo: Repository<TaskResponseRecord>,

    @InjectRepository(TaskResponder)
    private taskResponder: Repository<TaskResponder>,
  ) {}

  // Get all user responses for a task and store in manifest

  async respondToTask(data: UpdateTaskResponseDto) {
    try {
      const task = await this.taskRepository.findOneBy({
        id: data.task_id,
        status: TaskStatus.ACTIVE,
      });

      if (!task) {
        throw new HttpException('Task is not active', 400);
      }

      if (task.expired) {
        throw new HttpException('Task is no longer active', 400);
      }

      // check if user joined the task
      const userJoinedTask = await this.taskResponder.findOne({
        where: {
          taskId: data.task_id,
          userId: data.user_id,
        },
      });

      if (!userJoinedTask) {
        throw new HttpException('Please join task', 400);
      }

      const walletHasResponded = await this.taskResponseRepository.findOne({
        where: {
          walletAddress: data.wallet_address,
          taskId: data.task_id,
        },
      });

      if (walletHasResponded) {
        console.log('WALLET HAS ALREADY RESPONDED');
        throw new HttpException('User has already responded', 400);
      }

      if (userJoinedTask.taskPerformed) {
        throw new HttpException('User has already responded', 400);
      }

      // check if number of possible responses is not exceeded

      const taskResponseCount = await this.taskResponseRepository.count({
        where: {
          taskId: data.task_id,
        },
      });

      if (taskResponseCount === task.numberOfWinners) {
        throw new HttpException('Task is no longer active', 400);
      }

      const taskResponse = new TaskResponse();

      taskResponse.response = data.response;
      taskResponse.responseType = data.response_type;
      taskResponse.responseUrl = data.response_url;
      taskResponse.taskId = data.task_id;
      taskResponse.userId = data.user_id;
      taskResponse.walletAddress = data.wallet_address;

      const response = await this.taskResponseRepository.save(taskResponse);

      // check if number of winners is complete

      const newTaskResponseCount = await this.taskResponseRepository.count({
        where: {
          taskId: data.task_id,
        },
      });

      userJoinedTask.taskPerformed = true;
      await this.taskResponder.save(userJoinedTask);

      if (newTaskResponseCount === task.numberOfWinners) {
        console.log('CLosing task');
        // close task
        await this.closeTask(data.task_id);
      }

      return response;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  async listenToJobCompletion() {}

  // TODO listen for when it fails
  async closeTask(taskId: string) {
    const task = await this.taskRepository.findOneBy({ id: taskId });

    const taskResponses = await this.taskResponseRepository.find({
      where: {
        taskId: taskId,
      },
    });

    // Create manifest
    const manifest = constructHmtManifest({
      taskId,
      taskResponses,
    });

    const manifestPath = `./public/uploads/manifests/${task.id}.json`;

    await writeFile(manifestPath, JSON.stringify(manifest));

    let data = createReadStream(manifestPath);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://foundation-accounts.hmt.ai/requester/quick_launch?api_key=${HMT_JOB_API_KEY}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(async (response) => {
        // create job response
        const taskResponseRecord = new TaskResponseRecord();
        taskResponseRecord.taskId = task.id;
        taskResponseRecord.manifestHash = task.id;
        taskResponseRecord.manifestUrl = manifestPath;
        taskResponseRecord.isReady = true;
        taskResponseRecord.isFunded = true;
        taskResponseRecord.hmtJobId = response.data.id;

        await this.taskResponseRecordRepo.save(taskResponseRecord);

        // Close the task
        task.expired = true;
        await this.taskRepository.save(task);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  async hmtJobWebhook(data: any) {
    const taskResponseRecord = await this.taskResponseRecordRepo.findOneBy({
      hmtJobId: data?.job_id,
    });

    if (!taskResponseRecord) {
      return false;
    }

    const responses = await axios.get(
      `https://accounts.hcaptcha.com/requester/jobs/results/${taskResponseRecord.hmtJobId}?final=1&api_key=${HMT_JOB_API_KEY}`,
    );

    if (responses.data.length === 0) {
      return false;
    }

    const responseData = responses.data;

    const taskResponses = await this.taskResponseRepository.find({
      where: {
        taskId: taskResponseRecord.taskId,
      },
    });
  }
}
