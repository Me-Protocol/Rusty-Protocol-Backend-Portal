import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import {
  POSTGRES_DATABASE,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
  RUN_DB_SYNC,
  RUN_DEFAULT_MIGRATION,
} from '../env.config';
import { join } from 'path';
import { DataSourceOptions } from 'typeorm';

export const typeormConfig: DataSourceOptions = {
  type: 'postgres',
  name: 'default',
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [process.cwd() + '/dist/migrations/*.{js,ts}'],
  subscribers: [join(__dirname, '../dist/subscribers/**.js')],
  migrationsRun: false,
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
};

export const AppDataSource = new DataSource(typeormConfig);

AppDataSource.initialize().then((r) =>
  Logger.log('[DATABASE] connection successful'),
);
