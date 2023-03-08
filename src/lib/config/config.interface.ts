import { ConfigType } from '@nestjs/config';
import { app } from './configs';

export interface IConfig {
  app: ConfigType<typeof app>;
}
