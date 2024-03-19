import { User } from '@src/globalServices/user/entities/user.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { PaymentMethod } from './paymentMethod.entity';

@Entity('fiat_wallet')
export class FiatWallet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    nullable: true,
  })
  userId: string;

  @Column({
    nullable: true,
  })
  brandId: string;

  @Column({
    nullable: true,
  })
  walletId: string;

  @OneToOne(() => User, (user) => user.fiatWallet)
  @JoinTable({ name: 'userId' })
  user: User;

  @OneToOne(() => Brand, (brand) => brand.fiatWallet)
  @JoinTable({ name: 'brandId' })
  brand: Brand;

  @Column({
    nullable: true,
  })
  stripeCustomerId: string;

  @Column({
    nullable: true,
  })
  stripeAccountId: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 5,
    default: 70000,
  })
  balance: number;

  @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.fiatWallet)
  paymentMethods: PaymentMethod[];

  @Column({
    type: 'decimal',
    default: 0,
    nullable: true,
  })
  meCredits: number;
}
