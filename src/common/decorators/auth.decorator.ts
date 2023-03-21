import { API_UNAUTHORIZED_RESPONSE } from "@common/constant";
import { JwtAuthGuard } from "@common/guards";
import { applyDecorators, CanActivate, Type, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";

interface IAuthGuard {
	guards?: Type<CanActivate>[];
	unauthorizedResponse?: string;
}

/**
 * It's a decorator that uses the JwtAuthGuard and Other guards, and returns an unauthorized
 * response if the user is not authenticated
 * @returns A function that returns a function
 *
 */

export const Auth = (options_?: IAuthGuard) => {
	const options: IAuthGuard = {
		guards: [JwtAuthGuard],
		unauthorizedResponse: API_UNAUTHORIZED_RESPONSE,
		...options_,
	};

	return applyDecorators(
		UseGuards(...options.guards),
		ApiBearerAuth(),
		ApiUnauthorizedResponse({ description: options.unauthorizedResponse }),
	);
};
