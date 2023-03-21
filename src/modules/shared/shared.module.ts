import { NestConfigModule } from "@lib/index";
import { OrmModule } from "@lib/orm/orm.module";
import { AuthModule } from "@modules/auth/auth.module";
import { UserModule } from "@modules/user/user.module";
import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";

@Module({
	imports: [OrmModule, NestConfigModule, UserModule, AuthModule, ServeStaticModule],
})
export class SharedModule {}
