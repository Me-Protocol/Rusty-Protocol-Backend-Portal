import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { InAppService } from './common/verifier/inapp.service';
import { OutAppService } from './common/verifier/outapp.service';
import { TaskDataService } from './data/taskData.service';

@Module({
  imports: [TypeOrmModule.forFeature([]), HttpModule],
  providers: [InAppService, OutAppService, TaskDataService],
  controllers: [],
  exports: [TypeOrmModule],
})
export class TasksModule {}
