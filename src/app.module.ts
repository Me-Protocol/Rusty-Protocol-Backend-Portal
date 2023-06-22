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
import { RewardsModule } from './modules/rewards/rewards.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import * as Joi from 'joi';
import { PaymentModule } from './modules/payment/payment.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { CustomerModule } from './modules/customer/customer.module';
import { CustomerController } from './modules/customer/customer.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        APP_SERVER_LISTEN_PORT: Joi.string().required(),
        APP_SERVER_LISTEN_IP: Joi.string().required(),
        API_VERSION: Joi.string().required(),
        GLOBAL_PREFIX: Joi.string().required(),
        CLIENT_APP_URI: Joi.string().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_DATABASE: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        JWT_SECRETS: Joi.string().required(),
        JWT_TIME: Joi.string().required(),
        TWILIO_SID: Joi.string().required(),
        TWILIO_TOKEN: Joi.string().required(),
        TWILIO_PHONE_NUMBER: Joi.string().required(),
        TWILIO_MSG_SID: Joi.string().required(),
        SENDGRID_API_KEY: Joi.string().required(),
        SENDGRID_EMAIL: Joi.string().required(),
        TWITTER_CONSUMER_KEY: Joi.string().required(),
        TWITTER_CONSUMER_SECRET: Joi.string().required(),
        TWITTER_CALLBACK_URL: Joi.string().required(),
        TWITTER_CLIENT_ID: Joi.string().required(),
        TWITTER_BREARER_TOKEN: Joi.string().required(),
        TWITTER_ACCESS_TOKEN: Joi.string().required(),
        TWITTER_ACCESS_SECRET: Joi.string().required(),
        TWITTER_LINK_CALLBACK_URL: Joi.string().required(),
        FACEBOOK_CLIENT_ID: Joi.string().required(),
        FACEBOOK_REDIRECT_URI: Joi.string().required(),
        FACEBOOK_SECRET: Joi.string().required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
        GOOGLE_REDIRECT_URI: Joi.string().required(),
        CLOUDINARY_CLOUD_NAME: Joi.string().required(),
        CLOUDINARY_API_KEY: Joi.string().required(),
        CLOUDINARY_API_SECRET: Joi.string().required(),
        STRIPE_SECRET_KEY: Joi.string().required(),
        STRIPE_PUBLISHABLE_KEY: Joi.string().required(),
        STRIPE_API_VERSION: Joi.string().required(),
        STRIPE_REFRESH_URL: Joi.string().required(),
        NODE_ENV: Joi.string().required(),
        DFNS_ACCESS_TOKEN: Joi.string().required(),
        DFNS_PRIVATE_ACCESS_TOKEN: Joi.string().required(),
      }),
      envFilePath: './.env',
    }),
    TypeOrmModule.forFeature([User, Customer, Brand, Category, Device]),
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
    RewardsModule,
    AnalyticsModule,
    PaymentModule,
    CustomerModule,
    CustomerModule,
    TasksModule,
  ],
  controllers: [
    AppController,
    SearchController,
    CustomerController,
    AuthenticationModule,
    AuthenticationController,
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
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AppModule {}
