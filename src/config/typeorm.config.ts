import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Brand } from "@src/globalServices/brand/entities/brand.entity";
import { Category } from "@src/globalServices/category/entities/category.entity";
import { Customer } from "@src/globalServices/customer/entities/customer.entity";
import { Device } from "@src/globalServices/user/entities/device.entity";
import { User } from "@src/globalServices/user/entities/user.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  entities: [User, Device, Customer, Brand, Category],
  migrations: [__dirname + "/../database/migrations/*{.ts,.js}"],
  extra: {
    charset: "utf8mb4_unicode_ci",
  },
  synchronize: true,
  autoLoadEntities: true,
  logging: false,
  // ssl: true,
};
