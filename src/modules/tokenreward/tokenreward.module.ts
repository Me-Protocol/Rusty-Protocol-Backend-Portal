import { Module } from '@nestjs/common';
import { TokenrewardService } from './tokenreward.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenReward } from './models/tokenreward.entity';

@Module({
  providers: [TokenrewardService],
  imports: [TypeOrmModule.forFeature([TokenReward])],
})
export class TokenrewardModule {}
