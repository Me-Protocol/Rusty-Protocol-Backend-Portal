import { Module } from '@nestjs/common';
import { ElasticSearchCronService } from './elasticsearch.cron';

@Module({
  providers: [ElasticSearchCronService],
})
export class CronModule {}
