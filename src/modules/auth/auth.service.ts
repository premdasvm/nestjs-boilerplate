import { HelperService } from "@common/helpers/helpers.utils";
import { TokenService } from "@modules/token/token.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { isEmpty } from "helper-fns";

import { User } from "@modules/user/entities/user.entity";

import { UserMobileNumberLoginDto } from "./dtos/user-login-mobile-number.dto";
import { UserLoginEmailDto } from "./dtos/user-login-email.dto";
import { AuthMethod } from "@common/types";

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) private readonly userRepo: Repository<User>,
		private readonly tokenService: TokenService,
	) {}

	async loginWithMobile({ mobileNumber, password }: UserMobileNumberLoginDto) {
		const user = await this.findByMobileNumber(mobileNumber);

		await this.validateUser(user, password);

		return await this.tokenService.generateAccessToken(user);
	}

	async loginWithEmail({ email, password }: UserLoginEmailDto, isPasswordLogin: boolean) {
		const user = await this.findByEmail(email);

		if (!isPasswordLogin && user.authMethod !== AuthMethod.SOCIAL_LOGIN) {
			throw new HttpException(
				"Please user email and password for login",
				HttpStatus.FORBIDDEN,
			);
		}

		if (isPasswordLogin) {
			await this.validateUser(user, password);
		}

		return await this.tokenService.generateAccessToken(user);
	}

	async validateUser(user: User, password: string) {
		const isPasswordValid = await HelperService.verifyHash(user.password, password);

		if (!isPasswordValid) {
			throw new HttpException("Credential didn't match!", HttpStatus.FORBIDDEN);
		}

		return isPasswordValid;
	}

	private async findByMobileNumber(mobileNumber: string) {
		const user = await this.userRepo.findOne({ where: { mobileNumber } });

		if (isEmpty(user)) {
			throw new HttpException("User not found", HttpStatus.NOT_FOUND);
		}

		return user;
	}

	private async findByEmail(email: string) {
		const user = await this.userRepo.findOne({ where: { email } });

		if (isEmpty(user)) {
			throw new HttpException("User not found", HttpStatus.NOT_FOUND);
		}

		return user;
	}
}
