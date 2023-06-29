import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { InAppService } from './common/verifier/inapp.service';
import { OutAppService } from './common/verifier/outapp.service';
import { TaskDataService } from './data/taskData.service';
import { TaskResponseRecord } from '@src/models/taskResponseRecord.entity';
import { JobResponse } from '@src/models/jobResponse.entity';
import { TaskResponse } from '@src/models/taskResponse.entity';
import { Task } from '@src/models/tasks.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      JobResponse,
      TaskResponse,
      TaskResponseRecord,
      Task,
    ]),
    HttpModule,
  ],
  providers: [InAppService, OutAppService, TaskDataService],
  controllers: [],
  exports: [TypeOrmModule],
})
export class TasksModule {}
