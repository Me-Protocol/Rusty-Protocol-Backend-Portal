import { Entity, Column, OneToMany, OneToOne } from 'typeorm';
import { Device } from './device.entity';
import { BaseEntity } from '@src/common/entities/base.entity';
import { LoginType } from '@src/utils/enums/LoginType';
import { Role } from '@src/utils/enums/Role';
import { TwoFAType } from '@src/utils/enums/TwoFAType';
import { UserAppType } from '@src/utils/enums/UserAppType';
import { Customer } from '@src/globalServices/customer/entities/customer.entity';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { FiatWallet } from '@src/globalServices/fiatWallet/entities/fiatWallet.entity';
import { Collection } from '@src/globalServices/collections/entities/collection.entity';
import { Follow } from '@src/globalServices/follow/entities/follow.entity';
import { View } from '@src/globalServices/views/entities/view.entity';
import { Share } from '@src/globalServices/share/entities/share.entity';
import { Review } from '@src/globalServices/review/entities/review.entity';
import { Like } from '@src/globalServices/like/entities/like.entity';
import { TaskResponse } from '@src/globalServices/task/entities/taskResponse.entity';
import { RewardRegistry } from '@src/globalServices/reward/entities/registry.entity';
import { Order } from '@src/globalServices/order/entities/order.entity';
import { Coupon } from '@src/globalServices/order/entities/coupon.entity';
import { BrandMember } from '@src/globalServices/brand/entities/brand_member.entity';
import { BrandCustomer } from '@src/globalServices/brand/entities/brand_customer.entity';
import { Notification } from '@src/globalServices/notification/entities/notification.entity';
import { AdminMember } from '@src/globalServices/admin/entities/admin_member.entity';
// import { TaskResponseEntity } from '@src/models/taskResponse.entity';

@Entity('user')
export class User extends BaseEntity {
  @Column({
    unique: true,
    nullable: true,
  })
  email: string;

  @Column({
    nullable: true,
    unique: true,
  })
  phone: string;

  @Column({
    nullable: true,
  })
  password: string;

  @Column()
  username: string;

  @Column({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  last_login: Date;

  @Column({
    type: 'enum',
    enum: LoginType,
    default: LoginType.DEFAULT,
    nullable: true, // TODO REMOVE ME
  })
  loginType: LoginType;

  @Column({
    nullable: true,
  })
  accountVerificationCode: number;

  @Column({
    nullable: true,
  })
  emailVerified: boolean;

  @Column({
    nullable: true,
  })
  phoneVerified: boolean;

  @Column({
    nullable: true,
  })
  passwordResetCode: number;

  @Column({
    nullable: true,
  })
  salt: string;

  @Column({
    nullable: true,
    default: false,
  })
  is2faEnabled: boolean;

  @Column({
    nullable: true,
    default: false,
  })
  banned: boolean;

  @Column({
    nullable: true,
    default: false,
  })
  suspended: boolean;

  @OneToMany(() => Device, (device) => device.user)
  devices: Device[];

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CUSTOMER,
  })
  role: Role;

  @Column({
    nullable: true,
    type: 'jsonb',
  })
  facebookAuth: {
    username: string;
    accessToken: string;
    refreshToken: string;
  };

  @Column({
    nullable: true,
    type: 'jsonb',
  })
  googleAuth: {
    username: string;
    accessToken: string;
    refreshToken: string;
  };

  @Column({
    nullable: true,
    type: 'jsonb',
  })
  twitterAuth: {
    username: string;
    accessToken: string;
    refreshToken: string;
  };

  @Column({
    nullable: true,
    type: 'enum',
    enum: TwoFAType,
  })
  twoFAType: TwoFAType;

  @Column('text', {
    nullable: true,
    array: true,
  })
  following_interests: string[];

  @Column({
    type: 'enum',
    enum: UserAppType,
    default: UserAppType.USER,
    nullable: true,
  })
  userType: UserAppType;

  @Column({
    nullable: true,
  })
  countryCode: string;

  @Column({
    nullable: true,
  })
  countryName: string;

  @OneToOne(() => Customer, (customer) => customer.user, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  customer: Customer;

  @OneToOne(() => BrandMember, (brandMember) => brandMember.user, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  brandMember: BrandMember;

  @OneToOne(() => AdminMember, (adminMember) => adminMember.user, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  adminMember: AdminMember;

  @OneToOne(() => Brand, (brand) => brand.user, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  brand: Brand;

  @OneToOne(() => FiatWallet, (wallet) => wallet.user)
  fiatWallet: FiatWallet;

  @OneToMany(() => Collection, (collection) => collection.user)
  collections: Collection[];

  @Column('text', {
    array: true,
    nullable: true,
  })
  user_category_interests: string[];

  @OneToMany(() => Follow, (follow) => follow.user)
  following: Follow[];

  @OneToMany(() => View, (view) => view.user)
  views: View[];

  @OneToMany(() => Share, (share) => share.user)
  shares: Share[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => TaskResponse, (taskResponse) => taskResponse.user)
  taskResponses: TaskResponse[];

  @OneToMany(() => RewardRegistry, (rewardRegistry) => rewardRegistry.user)
  rewardRegistries: RewardRegistry[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Coupon, (coupon) => coupon.user)
  coupons: Coupon[];

  @Column({
    nullable: true,
  })
  language: string;

  @Column({
    nullable: true,
  })
  timezone: string;

  @Column({
    nullable: true,
  })
  region: string;

  @Column({
    nullable: true,
  })
  currency: string;

  @OneToMany(() => BrandCustomer, (customer) => customer.user)
  brandCustomers: BrandCustomer[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
}
