import { Equals, IsString } from 'class-validator';
import { RegistrationStep } from '../../types/auth.type';

export class ConfirmEmailSessionDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @Equals(RegistrationStep.EmailConfirmation)
  currentRegistrationStep: RegistrationStep;

  @IsString()
  emailConfirmationCode: string;

  @Equals(false)
  isEmailConfirmed: boolean;
}
