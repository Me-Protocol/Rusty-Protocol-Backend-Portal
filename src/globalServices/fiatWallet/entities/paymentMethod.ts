// payment card

import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '@src/common/entities/base.entity';
import { FiatWallet } from './fiatWallet.entity';

@Entity('payment_method')
export class PaymentMethod extends BaseEntity {
  @Column()
  walletId: string;

  @ManyToOne(() => FiatWallet, (wallet) => wallet.paymentMethods)
  fiatWallet: FiatWallet;

  @Column({
    nullable: true,
  })
  stripePaymentMethodId: string;

  @Column({
    default: false,
  })
  isDefault: boolean;
}
