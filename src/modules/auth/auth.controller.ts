import { GenericController } from "@common/decorators";
import { Body, Get, Post, Query, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserMobileNumberLoginDto } from "./dtos/user-login-mobile-number.dto";
import { AuthGuard } from "@nestjs/passport";
import { LoggedInUser } from "@common/decorators/user.decorator";
import { IOauthResponse } from "@common/types";
import { Request, Response } from "express";
import { UserLoginEmailDto } from "./dtos/user-login-email.dto";

@GenericController("auth", false)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("mobile-number/login")
	loginWithMobile(@Body() dto: UserMobileNumberLoginDto) {
		return this.authService.loginWithMobile(dto);
	}

	@Post("email/login")
	loginWithEmail(@Body() dto: UserLoginEmailDto) {
		return this.authService.loginWithEmail(dto, true);
	}

	@Get("google")
	@UseGuards(AuthGuard("google"))
	async googleAuth(@Req() _request: Request) {}

	@Get("google/redirect")
	@UseGuards(AuthGuard("google"))
	async googleAuthRedirect(
		@LoggedInUser()
		user: IOauthResponse,
		@Res() response: Response,
	) {
		try {
			const token = await this.authService.loginWithEmail({ email: user.email }, false);
			return response.redirect(`${process.env.API_URL}/v1/auth/oauth/login?token=${token}`);
		} catch (err) {
			throw err;
		}
	}

	@Get("oauth/login")
	oauthMock(@Query() query: { token: string }) {
		return query.token;
	}
}
