import { Module } from '@nestjs/common';
import { PointrewardController } from './pointreward.controller';
import { PointsrewardService } from './pointreward.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointsReward } from './model/pointreward.entity';

@Module({
  providers: [PointsrewardService],
  controllers: [PointrewardController],
})
export class PointrewardModule {}
