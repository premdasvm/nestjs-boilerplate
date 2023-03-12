import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  /**
   * Name of user
   * @example bruce
   */
  @IsNotEmpty()
  name: string;

  /**
   * Mobile Number of user
   * @example 1234567890
   */
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  mobileNumber: string;

  /**
   * Email of user
   * @example example_user@gmail.com
   */
  @IsOptional()
  email?: string;

  /**
   * Password of user
   * @example password@123
   */
  password: string;
}
