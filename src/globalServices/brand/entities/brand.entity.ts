import { BaseEntity } from '@src/common/entities/base.entity';
import { Category } from '@src/globalServices/category/entities/category.entity';
import { User } from '@src/globalServices/user/entities/user.entity';
import { RevenueRange } from '@src/utils/enums/RevenueRange';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Product } from '@src/globalServices/product/entities/product.entity';
import { Collection } from '@src/globalServices/collections/entities/collection.entity';
import { Follow } from '@src/globalServices/follow/entities/follow.entity';
import { Reward } from '@src/globalServices/reward/entities/reward.entity';
import { Task } from '@src/globalServices/task/entities/task.entity';
import { ApiKey } from '@src/globalServices/api_key/entities/api_key.entity';
import { PaymentRequest } from '@src/globalServices/costManagement/entities/paymentRequest.entity';
import { CostCollection } from '@src/globalServices/costManagement/entities/costCollection';
import { FiatWallet } from '@src/globalServices/fiatWallet/entities/fiatWallet.entity';
import { BrandSubServices } from '@src/utils/enums/BrandSubServices';
import { BrandMember } from './brand_member.entity';
import { Notification } from '@src/globalServices/notification/entities/notification.entity';
import { Order } from '@src/globalServices/order/entities/order.entity';
import { Review } from '@src/globalServices/review/entities/review.entity';
import { Bill } from '@src/globalServices/biller/entity/bill.entity';
import { BrandSubscriptionPlan } from './brand_subscription_plan.entity';
import { BrandStore } from '@src/globalServices/brand-store/brand-store.dto';
import { Region } from '@src/globalServices/currency/entities/region.entity';
import { OnlineStoreType } from '@src/utils/enums/OnlineStoreType';

@Entity('brand')
export class Brand extends BaseEntity {
  @Column()
  userId: string;

  @OneToOne(() => User, (user) => user.brand)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({
    nullable: true,
  })
  website: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  slogan: string;

  @Column('text', {
    nullable: true,
    array: true,
  })
  socialMediaLinks: {
    name: string;
    link: string;
  }[];

  @Column({
    nullable: true,
  })
  logo: string;

  @Column({
    nullable: true,
  })
  logo_icon: string;

  @Column({
    nullable: true,
  })
  logo_white: string;

  @Column({
    nullable: true,
  })
  logo_white_icon: string;

  @Column('text', {
    nullable: true,
    array: true,
  })
  banners: string[];

  @Column({
    nullable: true,
  })
  location: string;

  @Column({
    nullable: true,
  })
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.brands)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({
    nullable: true,
    type: 'enum',
    enum: RevenueRange,
  })
  revenueRange: RevenueRange;

  @Column({
    nullable: true,
  })
  vatTaxId: string;

  @Column({
    nullable: true,
  })
  ecommercePlatform: string;

  @Column({
    nullable: true,
  })
  loyaltyProgram: string;

  @Column({
    default: false,
  })
  isVerified: boolean;

  @Column({
    default: 0,
  })
  followersCount: number;

  @Column({
    default: 0,
  })
  viewsCount: number;

  @Column('simple-json', {
    nullable: true,
  })
  brandStore: BrandStore;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];

  @OneToMany(() => Task, (task) => task.brand)
  tasks: Task[];

  @OneToMany(() => Collection, (collection) => collection.brand)
  collections: Collection[];

  @OneToMany(() => Follow, (follow) => follow.brand)
  followers: Follow[];

  @OneToMany(() => Reward, (reward) => reward.brand)
  rewards: Reward[];

  @OneToMany(() => ApiKey, (api_key) => api_key.brand)
  apiKeys: ApiKey[];

  @OneToMany(() => PaymentRequest, (paymentRequest) => paymentRequest.brand)
  paymentRequests: PaymentRequest[];

  @Column({
    default: true,
  })
  canPayCost: boolean;

  @Column({
    default: true,
  })
  canPayCost_inApp: boolean;

  @OneToMany(() => CostCollection, (costCollection) => costCollection.brand)
  costCollections: CostCollection[];

  @OneToOne(() => FiatWallet, (wallet) => wallet.brand, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  fiatWallet: FiatWallet;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  autoTopupAmount: number;

  @Column('text', {
    nullable: true,
    array: true,
    default: [BrandSubServices.API, BrandSubServices.IN_APP],
  })
  subscribedServices: BrandSubServices[];

  @Column({
    default: true, // TODO: put back to false
  })
  enableAutoTopup: boolean;

  @OneToMany(() => BrandMember, (member) => member.brand)
  members: BrandMember[];

  @Column({
    nullable: true,
  })
  supportPhoneNumber: string;

  @Column({
    nullable: true, //TODO:: Remove nullable
  })
  brandProtocolId: string;

  @ManyToMany(() => Notification, (notification) => notification.brands)
  notifications: Notification[];

  @OneToMany(() => Order, (order) => order.brand)
  orders: Order[];

  @Column({
    default: false,
  })
  listOnStore: boolean;

  @Column({
    nullable: true,
  })
  brandPrimaryColor: string;

  @Column({
    nullable: true,
  })
  brandSecondaryColor: string;

  @Column({
    nullable: true,
  })
  walletAddress: string;

  @OneToMany(() => Review, (review) => review.brand)
  reviews: Review[];

  @Column({
    default: 50,
  })
  vaultPercentage: number;

  @Column({
    nullable: true,
  })
  noOfCustomers: number;

  @OneToMany(() => Bill, (bill) => bill.brand)
  bills: Bill[];

  @Column({
    nullable: true,
  })
  currency: string;

  @Column({
    nullable: true,
  })
  countryCode: string;

  @Column({
    nullable: true,
  })
  country: string;

  @Column({
    nullable: true,
  })
  region: string;

  @Column({
    nullable: true,
  })
  additionalAddress: string;

  @Column({
    nullable: true,
  })
  city: string;

  @Column({
    nullable: true,
  })
  postalCode: number;

  @Column({
    default: true,
  })
  firstTimeLogin: boolean;

  @Column({
    nullable: true,
  })
  planId: string;

  @ManyToOne(() => BrandSubscriptionPlan, (plan) => plan.id)
  @JoinColumn({ name: 'planId' })
  plan: BrandSubscriptionPlan;

  @Column({
    nullable: true,
  })
  lastPlanRenewalDate: Date;

  @Column({
    nullable: true,
  })
  nextPlanRenewalDate: Date;

  @Column({
    default: false,
  })
  isPlanActive: boolean;

  @Column({
    default: false,
  })
  isPlanExpired: boolean;

  @Column({
    default: false,
  })
  isPlanExpiringEmailSent: boolean;

  @ManyToMany(() => Region, (region) => region.brands)
  @JoinTable({
    name: 'brand_regions',
    joinColumn: {
      name: 'brandId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'regionId',
      referencedColumnName: 'id',
    },
  })
  regions: Region[];

  @Column({
    nullable: true,
    type: 'enum',
    enum: OnlineStoreType,
  })
  online_store_type: OnlineStoreType;

  @Column({
    nullable: true,
    select: false,
  })
  woocommerce_consumer_key: string;

  @Column({
    nullable: true,
    select: false,
  })
  woocommerce_consumer_secret: string;

  @Column({
    nullable: true,
  })
  woocommerce_store_url: string;
}
