import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LocalRegistrationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
