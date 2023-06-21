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
import { CustomerService } from "./modules/customer/customer.service";
import { BrandService } from "./modules/brand/brand.service";
import { CategoryService } from "./modules/category/category.service";
import { CustomerModule } from "./modules/customer/customer.module";
import { BrandModule } from "./modules/brand/brand.module";
import { CategoryModule } from "./modules/category/category.module";
import { CustomerController } from "./modules/customer/customer.controller";
import { BrandController } from "./modules/brand/brand.controller";
import { CategoryController } from "./modules/category/category.controller";

@Module({
  imports: [
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
    UserModule,
    MailModule,
    SmsModule,
    SearchModule,
    CustomerModule,
    BrandModule,
    CategoryModule,
  ],
  controllers: [
    AppController,
    UserController,
    SearchController,
    CustomerController,
    BrandController,
    CategoryController,
  ],
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
    CustomerService,
    BrandService,
    CategoryService,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AppModule {}
