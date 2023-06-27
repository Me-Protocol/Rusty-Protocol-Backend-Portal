import { Module } from '@nestjs/common';
import { TransactionEntity } from './entities/transaction.entity';
import { PaymentEntity } from './entities/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WithdrawalMethodsEntity } from './entities/withdrawalMethods.entity';
import { WithdrawalRequestEntity } from './entities/withdrawalRequest.entity';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [
    TypeOrmModule.forFeature([
      PaymentEntity,
      TransactionEntity,
      WithdrawalMethodsEntity,
      WithdrawalRequestEntity,
    ]),
  ],
})
export class PaymentModule {}
