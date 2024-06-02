import { IsEmail, IsString } from 'class-validator';

export class ResetPasswordRequestDto {
  @IsString()
  @IsEmail()
  email: string;
}

// return temporary token which we can use to verify reset password code
