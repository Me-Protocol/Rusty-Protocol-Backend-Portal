import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { MailModule } from './globalServices/mail/mail.module';
import { SmsModule } from './globalServices/sms/sms.module';
import { jwtConfigurations } from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
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
import { WalletService } from './modules/wallet/wallet.service';
import { WalletController } from './modules/wallet/wallet.controller';
import { WalletModule } from './modules/wallet/wallet.module';
import { Wallet } from './globalServices/wallet/entities/wallet.entity';
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
import { PaymentModule } from './modules/payment/payment.module';
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

@Module({
  imports: [
    //
    TypeOrmModule.forFeature([
      User,
      Customer,
      Brand,
      Category,
      Device,
      Wallet,
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
    ]),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register(jwtConfigurations),
    ElasticsearchModule.register({
      node: process.env.ELASTIC_NODE,
      auth: {
        username: process.env.ELASTIC_USERNAME,
        password: process.env.ELASTIC_PASSWORD,
      },
      tls: {
        ca: process.env.ELASTIC_CA,
        rejectUnauthorized: false,
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      requestTimeout: 30000,
    }),
    MailModule,
    SmsModule,
    SearchModule,
    AuthenticationModule,
    WalletModule,
    PaymentModule,
    UploadModule,
  ],
  controllers: [
    AppController,
    SearchController,
    AuthenticationController,
    WalletController,
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
    WalletService,
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
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AppModule {}
