import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { IConfig } from '@lib/config/config.interface';

config();

const configService = new ConfigService<IConfig, true>();

export const connectionOptions = {
  type: 'postgres',
  host: configService.get('database.host', { infer: true }),
  port: configService.get('database.port', { infer: true }),
  username: configService.get('database.user', { infer: true }),
  password: configService.get('database.password', { infer: true }),
  database: configService.get('database.dbName', { infer: true }),
  synchronize: false,
  dropSchema: false,
  migrationsRun: false,
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  subscribers: ['dist/**/*.subscriber{.ts,.js}'],
  migrations: ['migrations/**/*{.ts,.js}'],
  namingStrategy: new SnakeNamingStrategy(),
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'migrations',
    subscribersDir: 'src',
  },
} as PostgresConnectionOptions;

export default new DataSource(connectionOptions);
