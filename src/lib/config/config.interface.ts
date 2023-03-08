import { ConfigType } from '@nestjs/config';
import { app, database } from './configs';

export interface IConfig {
  app: ConfigType<typeof app>;
  database: ConfigType<typeof database>;
}
