import { IsNotEmpty } from 'class-validator';

export class UserLoginEmailDto {
  /**
   * Email of user
   * @example 1234567890
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
