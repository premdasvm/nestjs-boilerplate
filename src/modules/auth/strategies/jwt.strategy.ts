import { IJwtPayload } from "@common/types/interfaces/authentication.interface";
import { IConfig } from "@lib/config/config.interface";
import { User } from "@modules/user/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectRepository(User) private readonly userRepo: Repository<User>,
		configService: ConfigService<IConfig, true>,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get("jwt.secret", { infer: true }),
			ignoreExpiration: true,
		});
	}

	/**
	 *
	 * @description Validate the token and return the user
	 * @param payload string
	 * @returns User
	 *
	 */

	async validate(payload: IJwtPayload) {
		const { sub: id } = payload;

		// Accept the JWT and attempt to validate it using the user service

		return await this.userRepo.findOne({ where: { id } });
	}
}
