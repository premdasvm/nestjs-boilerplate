import { GenericController } from "@common/decorators";
import { Body, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserLoginDto } from "./dtos/user-login.dto";

@GenericController("auth", false)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("login")
	login(@Body() dto: UserLoginDto) {
		return this.authService.login(dto);
	}
}
