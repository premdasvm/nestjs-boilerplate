import { User } from "@modules/user/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";

import { pick } from "helper-fns";

@Injectable()
export class TokenService {
	constructor(private readonly jwt: JwtService) {}

	async generateAccessToken(user: Omit<User, "password">) {
		const options: JwtSignOptions = {
			subject: String(user.id),
		};
		return await this.jwt.signAsync({ ...pick(user, ["mobileNumber"]) }, options);
	}
}
