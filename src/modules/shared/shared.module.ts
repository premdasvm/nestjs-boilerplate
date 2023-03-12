import { NestConfigModule } from '@lib/index';
import { OrmModule } from '@lib/orm/orm.module';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [OrmModule, NestConfigModule, UserModule, AuthModule],
})
export class SharedModule {}
