import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserService } from "./modules/user/user.service";
import { UserController } from "./modules/user/user.controller";
import { UserModule } from "./modules/user/user.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/typeorm.config";
import { MailModule } from "./modules/mail/mail.module";
import { SmsModule } from "./modules/sms/sms.module";
import { jwtConfigurations } from "./config/jwt.config";
import { JwtModule } from "@nestjs/jwt";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { JwtStrategy } from "./middlewares/jwt-strategy.middleware";
import { SearchService } from "./modules/search/search.service";
import { SearchModule } from "./modules/search/search.module";
import { SearchController } from "./modules/search/search.controller";
import { SmsService } from "./modules/sms/sms.service";
import { MailService } from "./modules/mail/mail.service";
import { TwitterStrategy } from "./middlewares/twitter-strategy.middleware";
import { GoogleStrategy } from "./middlewares/google-strategy.middleware";
import { FacebookStrategy } from "./middlewares/facebook-strategy.middleware";
import { ElasticIndex } from "./modules/search/index/search.index";
import { RewardsModule } from './modules/rewards/rewards.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import * as Joi from "joi";

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
        ELASTIC_NODE: Joi.string().required(),
        ELASTIC_USERNAME: Joi.string().required(),
        ELASTIC_PASSWORD: Joi.string().required(),
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
        // STRIPE_SECRET_KEY: Joi.string().required(),
        // STRIPE_PUBLISHABLE_KEY: Joi.string().required(),
        // STRIPE_API_VERSION: Joi.string().required(),
        // STRIPE_REFRESH_URL: Joi.string().required(),
        NODE_ENV: Joi.string().required(),
        DFNS_ACCESS_TOKEN: Joi.string().required(),
        DFNS_PRIVATE_ACCESS_TOKEN: Joi.string().required(),
      }),
      envFilePath: "./.env",
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    PassportModule.register({ defaultStrategy: "jwt", session: false }),
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
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      requestTimeout: 30000,
    }),
    UserModule,
    MailModule,
    SmsModule,
    SearchModule,
    RewardsModule,
    PaymentsModule,
    AnalyticsModule,
  ],
  controllers: [AppController, UserController, SearchController],
  providers: [
    ElasticIndex,
    {
      provide: "SearchServiceInterface",
      useClass: SearchService,
    },
    AppService,
    UserService,
    JwtStrategy,
    TwitterStrategy,
    GoogleStrategy,
    FacebookStrategy,
    SmsService,
    MailService,
    SearchService,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AppModule {}
