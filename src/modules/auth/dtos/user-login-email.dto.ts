import { IsNotEmpty } from "class-validator";

export class UserLoginEmailDto {
	/**
	 * Email of user
	 * @example example@gmail.com
	 */
	@IsNotEmpty()
	email!: string;

	/**
	 * Password of user
	 * @example password@123
	 */
	@IsNotEmpty()
	password?: string;
}
