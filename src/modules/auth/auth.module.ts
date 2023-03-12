import { NestJwtModule } from "@lib/index";
import { TokenService } from "@modules/token/token.service";
import { User } from "@modules/user/entities/user.entity";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
	imports: [TypeOrmModule.forFeature([User]), PassportModule, NestJwtModule],
	controllers: [AuthController],
	providers: [AuthService, TokenService],
})
export class AuthModule {}
