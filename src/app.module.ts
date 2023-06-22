import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/typeorm.config";
import { MailModule } from "./globalServices/mail/mail.module";
import { SmsModule } from "./globalServices/sms/sms.module";
import { jwtConfigurations } from "./config/jwt.config";
import { JwtModule } from "@nestjs/jwt";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { JwtStrategy } from "./middlewares/jwt-strategy.middleware";
import { SearchService } from "./modules/search/search.service";
import { SearchModule } from "./modules/search/search.module";
import { SearchController } from "./modules/search/search.controller";
import { SmsService } from "./globalServices/sms/sms.service";
import { MailService } from "./globalServices/mail/mail.service";
import { TwitterStrategy } from "./middlewares/twitter-strategy.middleware";
import { GoogleStrategy } from "./middlewares/google-strategy.middleware";
import { FacebookStrategy } from "./middlewares/facebook-strategy.middleware";
import { ElasticIndex } from "./modules/search/index/search.index";
import { Customer } from "./globalServices/customer/entities/customer.entity";
import { User } from "./globalServices/user/entities/user.entity";
import { Brand } from "./globalServices/brand/entities/brand.entity";
import { Category } from "./globalServices/category/entities/category.entity";
import { Device } from "./globalServices/user/entities/device.entity";
import { UserService } from "./globalServices/user/user.service";
import { CustomerService } from "./globalServices/customer/customer.service";
import { BrandService } from "./globalServices/brand/brand.service";
import { AuthenticationModule } from "./modules/authentication/module";
import { AuthenticationController } from "./modules/authentication/controller";
import { AuthenticationService } from "./modules/authentication/service";

@Module({
  imports: [
    //
    TypeOrmModule.forFeature([User, Customer, Brand, Category, Device]),
    ConfigModule.forRoot({ isGlobal: true }),
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
    MailModule,
    SmsModule,
    SearchModule,
    AuthenticationModule,
  ],
  controllers: [AppController, SearchController, AuthenticationController],
  providers: [
    ElasticIndex,
    {
      provide: "SearchServiceInterface",
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
