import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Customer } from "@src/modules/customer/entities/customer.entity";
import { Device } from "@src/modules/user/entities/device.entity";
import { User } from "@src/modules/user/entities/user.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  entities: [User, Device, Customer],
  migrations: [__dirname + "/../database/migrations/*{.ts,.js}"],
  extra: {
    charset: "utf8mb4_unicode_ci",
  },
  synchronize: true,
  autoLoadEntities: true,
  logging: false,
  // ssl: true,
};
