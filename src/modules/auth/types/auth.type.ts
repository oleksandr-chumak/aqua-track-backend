import { UserCredentialsEntity } from '@modules/users/entities/user-credential.entity';
import { UserEntity } from '@modules/users/entities/user.entity';
import { Request } from 'express';

export enum RegistrationStep {
  EmailConfirmation = 'emailConfirmation',
  ProfileSetup = 'profileSetup',
}

export interface RequestWithUser extends Request {
  user: UserEntity;
}

export interface JwtAuthTokenPayload {
  id: number;
}

export interface ResetPasswordRequestBody {
  user: UserEntity;
}

export interface ConfirmEmailBody {
  code: string;
}

export interface VerifyResetPasswordCodeBody {
  user: UserEntity;
  code: string;
}

export interface ResetPasswordBody {
  userCredentials: UserCredentialsEntity;
  newPassword: string;
}
