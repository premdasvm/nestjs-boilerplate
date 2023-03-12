import { HelperService } from "@common/helpers/helpers.utils";
import { TokenService } from "@modules/token/token.service";
import { User } from "@modules/user/entities/user.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isEmpty, omit } from "helper-fns";
import { Repository } from "typeorm";
import { UserLoginDto } from "./dtos/user-login.dto";

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) private readonly userRepo: Repository<User>,
		private readonly tokenService: TokenService,
	) {}

	async login({ mobileNumber, password }: UserLoginDto) {
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
}
