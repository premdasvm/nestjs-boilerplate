import { NestConfigModule } from '@lib/index';
import { OrmModule } from '@lib/orm/orm.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [OrmModule, NestConfigModule],
})
export class SharedModule {}
