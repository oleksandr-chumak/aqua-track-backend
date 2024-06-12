import { Equals, IsString } from 'class-validator';
import { RegistrationStep } from '../../types/auth.type';

export class SetupProfileSessionDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @Equals(RegistrationStep.ProfileSetup)
  currentRegistrationStep: RegistrationStep;

  @IsString()
  emailConfirmationCode: string;

  @Equals(true)
  isEmailConfirmed: boolean;
}
