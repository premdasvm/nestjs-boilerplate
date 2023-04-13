import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { isEmpty } from "helper-fns";

import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { AuthMethod } from "@common/types";

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

	async create(dto: CreateUserDto) {
		const newUser = this.userRepo.create(dto);

		newUser.authMethod =
			dto.email && dto.mobileNumber
				? AuthMethod.EMAIL_MOBILE_PASSWORD
				: dto.email
				? AuthMethod.EMAIL_PASSWORD
				: AuthMethod.MOBILE_PASSWORD;

		return await this.userRepo.save(newUser);
	}

	async find() {
		return await this.userRepo.find();
	}

	async findOne(id: number) {
		const user = await this.userRepo.findOne({ where: { id } });

		if (isEmpty(user)) {
			throw new HttpException("User not found", HttpStatus.NOT_FOUND);
		}

		return user;
	}

	async update(id: number, dto: UpdateUserDto) {
		let user = await this.findOne(id);

		user = Object.assign(user, dto);

		return await this.userRepo.save(user);
	}

	async remove(id: number) {
		const user = await this.findOne(id);

		return await this.userRepo.softRemove(user);
	}
}
