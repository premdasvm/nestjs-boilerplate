import { NestJwtModule } from "@lib/index";
import { TokenService } from "@modules/token/token.service";
import { User } from "@modules/user/entities/user.entity";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { GoogleStrategy } from "./strategies/google.strategy";
import { UserService } from "@modules/user/user.service";

@Module({
	imports: [TypeOrmModule.forFeature([User]), PassportModule, NestJwtModule],
	controllers: [AuthController],
	providers: [AuthService, TokenService, UserService, JwtStrategy, GoogleStrategy],
	exports: [AuthService, JwtStrategy],
})
export class AuthModule { }
