import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from './globalServices/mail/mail.module';
import { SmsModule } from './globalServices/sms/sms.module';
import { jwtConfigurations } from './config/jwt.config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './middlewares/jwt-strategy.middleware';
import { SearchService } from './modules/search/search.service';
import { SearchModule } from './modules/search/search.module';
import { SearchController } from './modules/search/search.controller';
import { SmsService } from './globalServices/sms/sms.service';
import { MailService } from './globalServices/mail/mail.service';
import { TwitterStrategy } from './middlewares/twitter-strategy.middleware';
import { GoogleStrategy } from './middlewares/google-strategy.middleware';
import { FacebookStrategy } from './middlewares/facebook-strategy.middleware';
import { ElasticIndex } from './modules/search/index/search.index';
import { Customer } from './globalServices/customer/entities/customer.entity';
import { User } from './globalServices/user/entities/user.entity';
import { Brand } from './globalServices/brand/entities/brand.entity';
import { Category } from './globalServices/category/entities/category.entity';
import { Device } from './globalServices/user/entities/device.entity';
import { UserService } from './globalServices/user/user.service';
import { CustomerService } from './globalServices/customer/customer.service';
import { BrandService } from './globalServices/brand/brand.service';
import { AuthenticationModule } from './modules/authentication/module';
import { AuthenticationController } from './modules/authentication/controller';
import { AuthenticationService } from './modules/authentication/service';
import { FiatWallet } from './globalServices/fiatWallet/entities/fiatWallet.entity';
import { CategoryManagementController } from './modules/storeManagement/category/controller';
import { CategoryManagementService } from './modules/storeManagement/category/service';
import { CategoryService } from './globalServices/category/category.service';
import { ProductService } from './globalServices/product/product.service';
import { Product } from './globalServices/product/entities/product.entity';
import { ProductImage } from './globalServices/product/entities/productImage.entity';
import { ProductManagementService } from './modules/storeManagement/products/service';
import { ProductManagementController } from './modules/storeManagement/products/controller';
import { CustomerAccountManagementService } from './modules/accountManagement/customerAccountManagement/service';
import { BrandAccountManagementService } from './modules/accountManagement/brandAccountManagement/service';
import { CustomerManagementController } from './modules/accountManagement/customerAccountManagement/controller';
import { BrandManagementController } from './modules/accountManagement/brandAccountManagement/controller';
import { Collection } from './globalServices/collections/entities/collection.entity';
import { Variant } from './globalServices/product/entities/variants.entity';
import { Offer } from './globalServices/offer/entities/offer.entity';
import { UploadModule } from './modules/upload/upload.module';
import { UploadController } from './modules/upload/upload.controller';
import { UploadService } from './modules/upload/upload.service';
import { Follow } from './globalServices/follow/entities/follow.entity';
import { Share } from './globalServices/share/entities/share.entity';
import { View } from './globalServices/views/entities/view.entity';
import { Review } from './globalServices/review/entities/review.entity';
import { Reward } from './globalServices/reward/entities/reward.entity';
import { CollectionManagementController } from './modules/storeManagement/collections/controller';
import { CollectionManagementService } from './modules/storeManagement/collections/service';
import { FollowManagementService } from './modules/storeManagement/follow/service';
import { CollectionService } from './globalServices/collections/collections.service';
import { FollowService } from './globalServices/follow/follow.service';
import { FollowManagementController } from './modules/storeManagement/follow/controller';
import { LikeService } from './globalServices/like/like.service';
import { LikeManagementService } from './modules/storeManagement/like/service';
import { LikeManagementController } from './modules/storeManagement/like/controller';
import { Like } from './globalServices/like/entities/like.entity';
import { OfferService } from './globalServices/offer/offer.service';
import { OfferManagementService } from './modules/storeManagement/offers/service';
import { OfferManagementController } from './modules/storeManagement/offers/controller';
import { ViewsService } from './globalServices/views/view.service';
import { RewardService } from './globalServices/reward/reward.service';
import { SyncRewardService } from './globalServices/reward/sync/sync.service';
import { RewardManagementService } from './modules/storeManagement/reward/service';
import { RewardManagementController } from './modules/storeManagement/reward/controller';
import { SyncBatch } from './globalServices/reward/entities/syncBatch.entity';
import { RewardRegistry } from './globalServices/reward/entities/registry.entity';
import { RegistryHistory } from './globalServices/reward/entities/registryHistory.entity';
import { Order } from './globalServices/order/entities/order.entity';
import { Coupon } from './globalServices/order/entities/coupon.entity';
import { ApiKey } from './globalServices/api_key/entities/api_key.entity';
import { ApiKeyManagementController } from './modules/storeManagement/apiKey/controller';
import { ApiKeyManagementService } from './modules/storeManagement/apiKey/service';
import { OrderManagementService } from './modules/storeManagement/order/service';
import { ApiKeyService } from './globalServices/api_key/api_key.service';
import { OrderService } from './globalServices/order/order.service';
import { CouponService } from './globalServices/order/coupon.service';
import { OrderManagementController } from './modules/storeManagement/order/controller';
import { ScheduleModule } from '@nestjs/schedule';
import { CostBatch } from './globalServices/costManagement/entities/costBatch.entity';
import { CostCollection } from './globalServices/costManagement/entities/costCollection';
import { PaymentRequest } from './globalServices/costManagement/entities/paymentRequest.entity';
import { CostManagementController } from './modules/costModule/controller';
import { CostModuleService } from './globalServices/costManagement/costModule.service';
import { PaymentRequestService } from './globalServices/costManagement/paymentRequestProcessors.service';
import { CostModuleManagementService } from './modules/costModule/service';
import { Transaction } from './globalServices/fiatWallet/entities/transaction.entity';
import { PaymentService } from './globalServices/fiatWallet/payment.service';
import { FiatWalletService } from './globalServices/fiatWallet/fiatWallet.service';
import { PaymentModuleService } from './modules/paymentModule/service';
import { PaymentMethod } from './globalServices/fiatWallet/entities/paymentMethod';
import { PaymentModuleController } from './modules/paymentModule/controller';
import { InAppApiKeyJwtStrategy } from './middlewares/inapp-api-jwt-strategy.middleware';
import { SettingsService } from './globalServices/settings/settings.service';
import { BrandSubscriptionService } from './globalServices/brand/brandSeviceSubscription.service';
import { BrandMember } from './globalServices/brand/entities/brand_member.entity';
import { KeyManagementService } from './globalServices/key-management/key-management.service';
import { KeyIdentifier } from './globalServices/reward/entities/keyIdentifier.entity';
import { BrandCustomer } from './globalServices/brand/entities/brand_customer.entity';
import { Notification } from './globalServices/notification/entities/notification.entity';
import { NotificationController } from './modules/notification/controller';
import { NotificationService } from './globalServices/notification/notification.service';
import { InternalCacheModule } from './config/internal-cache/internal-cache.config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DatabaseConfig } from './config/db/db.config';
import { ClientModuleConfig } from './config/client-module/client-module.config';
import { AdminSettings } from './globalServices/settings/entities/admin_settings.entity';
import { SettingsModule } from './globalServices/settings/settings.module';
import { DebugController } from './debug/debug.controller';
import { ReviewManagementController } from './modules/storeManagement/review/controller';
import { ReviewService } from './globalServices/review/review.service';
import { ReviewManagementService } from './modules/storeManagement/review/service';
import { TasksService } from './globalServices/task/task.service';
import { TasksController } from './modules/taskModule/tasks.controller';
import { Task } from './globalServices/task/entities/task.entity';
import { TaskResponder } from './globalServices/task/entities/taskResponder.entity';
import { TaskResponse } from './globalServices/task/entities/taskResponse.entity';
import { BountyRecord } from './globalServices/task/entities/bountyRecord.entity';
import { Bounty } from './globalServices/oracles/bounty/entities/bounty.entity';
import { TaskResponseRecord } from './globalServices/task/entities/taskResponseRecord.entity';
import { JobResponse } from './globalServices/task/entities/jobResponse.entity';
import { HttpModule } from '@nestjs/axios';
import { InAppTaskVerifier } from './globalServices/task/common/verifier/inapp.service';
import { TwitterTaskVerifier } from './globalServices/task/common/verifier/outapp/twitter.verifier';
import { BullModule } from '@nestjs/bull';
import { SocialAuthenticationService } from './modules/authentication/socialAuth';
import { BountyService } from './globalServices/oracles/bounty/bounty.service';
import { Block } from './globalServices/oracles/bounty/entities/block.entity';
import { TaskScheduleService } from './globalServices/task/common/schedules/taskSchedule.service';
import { Bill } from './globalServices/biller/entity/bill.entity';
import { Invoice } from './globalServices/biller/entity/invoice.entity';
import { BillerService } from './globalServices/biller/biller.service';
import { HMTTaskVerifier } from './globalServices/task/common/verifier/outapp/hmt.verifier';
import { AnalyticsService } from './globalServices/analytics/analytics.service';
import { AnalyticsManagementService } from './modules/storeManagement/analytics/service';
import { AnalyticsManagementController } from './modules/storeManagement/analytics/controller';
import { RewarderService } from './globalServices/task/common/rewarder/rewarder.service';
import { AnalyticsRecorderService } from './globalServices/analytics/analytic_recorder.service';
import { RewardCirculation } from './globalServices/analytics/entities/reward_circulation';
import { BrandSubscriptionPlan } from './globalServices/brand/entities/brand_subscription_plan.entity';
import { NotificationHandler } from '@src/globalServices/notification/notification.handler';
import { CurrencyService } from './globalServices/currency/currency.service';
import { Currency } from './globalServices/currency/entities/currency.entity';
import { Voucher } from './globalServices/biller/entity/voucher.entity';
import { CreateSendgridContactHandler } from '@src/globalServices/mail/create-sendgrid-contact.handler';
import { TopupEventBlock } from './globalServices/brand/entities/topup_event_block.entity';
import { VariantOption } from '@src/globalServices/product/entities/variantvalue.entity';
import { BrandUploadGateway } from './modules/accountManagement/brandAccountManagement/socket/brand-upload.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseConfig, // Database config
    TypeOrmModule.forFeature([
      User,
      Customer,
      Brand,
      Category,
      Device,
      FiatWallet,
      Product,
      ProductImage,
      Collection,
      Variant,
      Offer,
      Follow,
      Share,
      View,
      Review,
      Reward,
      Like,
      SyncBatch,
      RewardRegistry,
      RegistryHistory,
      Order,
      Coupon,
      ApiKey,
      CostBatch,
      CostCollection,
      PaymentRequest,
      Transaction,
      PaymentMethod,
      BrandMember,
      KeyIdentifier,
      BrandCustomer,
      Notification,
      AdminSettings,
      Task,
      TaskResponder,
      TaskResponse,
      BountyRecord,
      Bounty,
      TaskResponseRecord,
      JobResponse,
      Block,
      Bill,
      Invoice,
      RewardCirculation,
      BrandSubscriptionPlan,
      Currency,
      Voucher,
      TopupEventBlock,
      VariantOption,
    ]),
    SettingsModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register(jwtConfigurations),
    // ElasticSearchConfig, // elastic search config
    InternalCacheModule, // redis config
    MailModule,
    SmsModule,
    SearchModule,
    AuthenticationModule,
    UploadModule,
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    ClientModuleConfig, // microservice
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOSTNAME'),
          port: configService.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),

    BullModule.registerQueueAsync({
      name: 'task-queue',
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        name: configService.get('TASK_QUEUE'),
      }),
      inject: [ConfigService],
    }),
    HttpModule,
  ],
  controllers: [
    AppController,
    SearchController,
    AuthenticationController,
    CategoryManagementController,
    ProductManagementController,
    CustomerManagementController,
    BrandManagementController,
    UploadController,
    CollectionManagementController,
    FollowManagementController,
    LikeManagementController,
    OfferManagementController,
    RewardManagementController,
    ApiKeyManagementController,
    OrderManagementController,
    CostManagementController,
    PaymentModuleController,
    NotificationController,
    DebugController,
    ReviewManagementController,
    TasksController,
    AnalyticsManagementController,
  ],
  providers: [
    ElasticIndex,
    {
      provide: 'SearchServiceInterface',
      useClass: SearchService,
    },
    AppService,
    JwtStrategy,
    TwitterStrategy,
    GoogleStrategy,
    FacebookStrategy,
    SmsService,
    MailService,
    SearchService,
    UserService,
    CustomerService,
    BrandService,
    AuthenticationService,
    CategoryService,
    ProductService,
    CategoryManagementService,
    ProductManagementService,
    CustomerAccountManagementService,
    BrandAccountManagementService,
    UploadService,
    CollectionManagementService,
    FollowManagementService,
    CollectionService,
    FollowService,
    LikeService,
    LikeManagementService,
    OfferService,
    OfferManagementService,
    ViewsService,
    RewardService,
    SyncRewardService,
    RewardManagementService,
    ApiKeyManagementService,
    ApiKeyService,
    OrderManagementService,
    OrderService,
    CouponService,
    CostModuleService,
    PaymentRequestService,
    CostModuleManagementService,
    PaymentService,
    FiatWalletService,
    PaymentModuleService,
    InAppApiKeyJwtStrategy,
    SettingsService,
    BrandSubscriptionService,
    KeyManagementService,
    NotificationService,
    ReviewService,
    ReviewManagementService,
    TasksService,
    InAppTaskVerifier,
    TwitterTaskVerifier,
    SocialAuthenticationService,
    BountyService,
    TaskScheduleService,
    BillerService,
    HMTTaskVerifier,
    AnalyticsService,
    AnalyticsManagementService,
    RewarderService,
    AnalyticsRecorderService,
    JwtService,
    NotificationHandler,
    CreateSendgridContactHandler,
    CurrencyService,
    BrandUploadGateway,
  ],
  exports: [JwtStrategy, PassportModule, AuthenticationModule],
})
export class AppModule {}
