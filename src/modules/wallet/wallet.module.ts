import { Module } from '@nestjs/common';
import { TransactionEntity } from './entities/transaction.entity';
import { WalletEntity } from './entities/wallet.entity';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WithdrawalMethodsEntity } from './entities/withdrawalMethods.entity';
import { WithdrawalRequestEntity } from './entities/withdrawalRequest.entity';

@Module({
  controllers: [WalletController],
  providers: [WalletService],
  imports: [
    TypeOrmModule.forFeature([
      WalletEntity,
      TransactionEntity,
      WithdrawalMethodsEntity,
      WithdrawalRequestEntity,
    ]),
  ],
})
export class WalletModule {}
