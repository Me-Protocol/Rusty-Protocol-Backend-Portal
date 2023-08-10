import { BaseEntity } from '@src/common/entities/base.entity';
import { Category } from '@src/globalServices/category/entities/category.entity';
import { User } from '@src/globalServices/user/entities/user.entity';
import { RevenueRange } from '@src/utils/enums/RevenueRange';
import {
  Column,
  Entity,
  JoinColumn,
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
    default: false,
  })
  canPayCost: boolean;

  @Column({
    default: false,
  })
  canPayCost_inApp: boolean;

  @OneToMany(() => CostCollection, (costCollection) => costCollection.brand)
  costCollections: CostCollection[];

  @OneToOne(() => FiatWallet, (wallet) => wallet.brand)
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
  })
  subscribedServices: BrandSubServices[];
}
