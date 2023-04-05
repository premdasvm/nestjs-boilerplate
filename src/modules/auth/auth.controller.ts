import { GenericController, Public } from "@common/decorators";
import { Body, Get, Post, Query, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserLoginMobileNoDto } from "./dtos/user-login-mobileNo.dto";
import { AuthGuard } from "@nestjs/passport";
import { LoggedInUser } from "@common/decorators/user.decorator";
import { IOauthResponse } from "@common/types";
import { Request, Response } from "express";
import { LoginType } from "@common/types/enums/misc.enum";

@GenericController("auth", false)
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Post("login")
	login(@Body() dto: UserLoginMobileNoDto) {
		return this.authService.login(dto);
	}

	@Public()
	@Get("google")
	@UseGuards(AuthGuard("google"))
	async googleAuth(@Req() _request: Request) { }

	@Public()
	@Get("google/redirect")
	@UseGuards(AuthGuard("google"))
	async googleAuthRedirect(
		@LoggedInUser()
		user: IOauthResponse,
		@Res() response: Response) {

		try {
			const token = await this.authService.googleLogin(user, LoginType.GOOGLE);
			return response.redirect(
				`${process.env.API_URL}/v1/auth/oauth/login?token=${token}`,
			);
		} catch (err) {
			throw err
		}
	}

	@Get("oauth/login")
	oauthMock(@Query() query: { token: string }) {
		console.log('oauth/login');
		return { message: "successfully logged", token: query.token };
	}
}
