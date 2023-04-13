import { Body, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";

import { UserService } from "./user.service";

import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { GenericController, Public } from "@common/decorators";

@GenericController("users")
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Public()
	@Post("register")
	create(@Body() dto: CreateUserDto) {
		return this.userService.create(dto);
	}

	@Get()
	find() {
		return this.userService.find();
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.userService.findOne(id);
	}

	@Patch(":id")
	update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
		return this.userService.update(id, dto);
	}

	@Delete(":id")
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.userService.remove(id);
	}
}
