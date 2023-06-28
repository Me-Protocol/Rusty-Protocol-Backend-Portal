import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RewardsEntity } from './models/rewards.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RewardsEntity])],
  providers: [],
  exports: [TypeOrmModule],
})
export class RewardsModule {}
