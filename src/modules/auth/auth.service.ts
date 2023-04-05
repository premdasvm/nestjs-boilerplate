import { HelperService } from "@common/helpers/helpers.utils";
import { TokenService } from "@modules/token/token.service";
import { User } from "@modules/user/entities/user.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isEmpty, omit } from "helper-fns";
import { Repository } from "typeorm";
import { UserLoginMobileNoDto } from "./dtos/user-login-mobileNo.dto";
import { LoginType } from "@common/types/enums/misc.enum";
import { UserService } from "@modules/user/user.service";
import { CreateUserDto } from "@modules/user/dtos/create-user.dto";

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) private readonly userRepo: Repository<User>,
		private readonly tokenService: TokenService,
		private readonly userService: UserService
	) { }

	async login({ mobileNumber, password }: UserLoginMobileNoDto) {
		const user = await this.validateUser(mobileNumber, password);

		if (isEmpty(user)) {
			throw new HttpException("Invalid Credentials", HttpStatus.FORBIDDEN);
		}

		return await this.tokenService.generateAccessToken(user);
	}

	async validateUser(mobileNumber: string, pass: string) {
		const user = await this.userRepo.findOne({ where: { mobileNumber } });

		if (isEmpty(user)) {
			throw new HttpException("User not found", HttpStatus.FORBIDDEN);
		}

		const isPasswordValid = HelperService.verifyHash(user.password, pass);

		if (!isPasswordValid) {
			throw new HttpException("Credential didn't match!", HttpStatus.BAD_REQUEST);
		}

		return omit(user, ["password"]);
	}

	async googleLogin(user, loginType: LoginType) {
		console.log(loginType);
		const userFound = await this.validateGoogleUser(user);
		return await this.tokenService.generateAccessToken(userFound);
	}

	async validateGoogleUser(user) {
		const userFound = await this.userRepo.findOne({ where: { email: user.email } });

		if (isEmpty(userFound)) {
			let dto: CreateUserDto = { name: user.firstName + ' ' + user.lastName, email: user.email, password: '' }
			const userRegistered = await this.userService.create(dto);

			return omit(userRegistered, ["password"]);
		} else {
			return omit(userFound, ["password"]);
		}
	}

}
