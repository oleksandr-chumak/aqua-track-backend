import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyResetPasswordCodeDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  code: string;
}

//return temporary token which we can use to reset password
