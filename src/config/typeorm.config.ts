require('dotenv').config();
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ApiKey } from '@src/globalServices/api_key/entities/api_key.entity';
import { Brand } from '@src/globalServices/brand/entities/brand.entity';
import { Category } from '@src/globalServices/category/entities/category.entity';
import { Collection } from '@src/globalServices/collections/entities/collection.entity';
import { CostBatch } from '@src/globalServices/costManagement/entities/costBatch.entity';
import { CostCollection } from '@src/globalServices/costManagement/entities/costCollection';
import { PaymentRequest } from '@src/globalServices/costManagement/entities/paymentRequest.entity';
import { Customer } from '@src/globalServices/customer/entities/customer.entity';
import { Follow } from '@src/globalServices/follow/entities/follow.entity';
import { Like } from '@src/globalServices/like/entities/like.entity';
import { Offer } from '@src/globalServices/offer/entities/offer.entity';
import { Coupon } from '@src/globalServices/order/entities/coupon.entity';
import { Order } from '@src/globalServices/order/entities/order.entity';
import { Product } from '@src/globalServices/product/entities/product.entity';
import { ProductImage } from '@src/globalServices/product/entities/productImage.entity';
import { Variant } from '@src/globalServices/product/entities/variants.entity';
import { Review } from '@src/globalServices/review/entities/review.entity';
import { RewardRegistry } from '@src/globalServices/reward/entities/registry.entity';
import { RegistryHistory } from '@src/globalServices/reward/entities/registryHistory.entity';
import { Reward } from '@src/globalServices/reward/entities/reward.entity';
import { SyncBatch } from '@src/globalServices/reward/entities/syncBatch.entity';
import { Share } from '@src/globalServices/share/entities/share.entity';
import { JobResponse } from '@src/globalServices/task/entities/jobResponse.entity';
import { Task } from '@src/globalServices/task/entities/task.entity';
import { TaskResponder } from '@src/globalServices/task/entities/taskResponder.entity';
import { TaskResponse } from '@src/globalServices/task/entities/taskResponse.entity';
import { TaskResponseRecord } from '@src/globalServices/task/entities/taskResponseRecord.entity';
import { Device } from '@src/globalServices/user/entities/device.entity';
import { User } from '@src/globalServices/user/entities/user.entity';
import { View } from '@src/globalServices/views/entities/view.entity';
import { PaymentMethod } from '@src/globalServices/fiatWallet/entities/paymentMethod';
import { FiatWallet } from '@src/globalServices/fiatWallet/entities/fiatWallet.entity';
import { BrandMember } from '@src/globalServices/brand/entities/brand_member.entity';
import { KeyIdentifier } from '@src/globalServices/reward/entities/keyIdentifier.entity';
import { BrandCustomer } from '@src/globalServices/brand/entities/brand_customer.entity';
import { Notification } from '@src/globalServices/notification/entities/notification.entity';
import { RedisOptions } from 'ioredis';
import { AdminSettings } from '@src/globalServices/settings/entities/admin_settings.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  entities: [
    User,
    Device,
    Customer,
    Brand,
    Category,
    FiatWallet,
    Product,
    ProductImage,
    Task,
    Collection,
    Variant,
    Offer,
    Follow,
    View,
    Share,
    Review,
    Reward,
    Like,
    TaskResponse,
    TaskResponder,
    JobResponse,
    TaskResponseRecord,
    SyncBatch,
    RewardRegistry,
    RegistryHistory,
    Order,
    Coupon,
    ApiKey,
    CostBatch,
    CostCollection,
    PaymentRequest,
    PaymentMethod,
    BrandMember,
    KeyIdentifier,
    BrandCustomer,
    Notification,
    AdminSettings,
  ],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  // cache: {
  //   type: 'redis',
  //   provider: (redisOptions: RedisOptions) =>
  //     require('cache-manager-ioredis').createCacheManager({
  //       ...redisOptions,
  //       isCacheableValue: () => true,
  //       storeClient: require('ioredis').createClient({
  //         ...redisOptions,
  //         lazyConnect: true,
  //       }),
  //       retryStrategy: (times) => {
  //         const delay = Math.min(times * 50, 2000);
  //         return delay;
  //       },
  //     }),
  //   options: {
  //     retryAttempts: 5,
  //     cachePrefix: process.env.REDIS_PREFIX,
  //     enableReadyCheck: true,
  //     connectTimeout: 10000,
  //     maxRetriesPerRequest: 3,
  //     reconnectOnError: (err: { message: string }) => {
  //       const targetErrors = [/READONLY/, /ETIMEDOUT/];
  //       targetErrors.forEach((targetError) => {
  //         if (targetError.test(err.message)) {
  //           return true;
  //         }
  //       });
  //       return false;
  //     },
  //   },
  // },
  synchronize: true,
  autoLoadEntities: true,
  logging: false,
  ssl: {
    rejectUnauthorized: false,
  },
  // ssl: true,
};
