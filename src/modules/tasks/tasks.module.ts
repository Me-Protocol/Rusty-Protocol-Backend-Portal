import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { InAppService } from './common/verifier/inapp.service';
import { OutAppService } from './common/verifier/outapp.service';
import { TaskDataService } from './data/taskData.service';
import { TaskResponseRecord } from '@src/models/taskResponseRecord.entity';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { JobResponse } from '@src/models/jobResponse.entity';
import { TaskResponse } from '@src/models/taskResponse.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      JobResponse,
      TaskResponse,
      TaskResponseRecord,
      Brand,
    ]),
    HttpModule,
  ],
  providers: [InAppService, OutAppService, TaskDataService],
  controllers: [],
  exports: [TypeOrmModule],
})
export class TasksModule {}
