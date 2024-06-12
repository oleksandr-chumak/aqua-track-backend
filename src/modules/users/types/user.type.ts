import { UserCredentialsEntity } from '../entities/user-credential.entity';
import { UserEntity } from '../entities/user.entity';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export type UserEntityRequiredFields = Pick<
  UserEntity,
  'name' | 'waterConsumption' | 'weight' | 'gender' | 'physicalActivityTime'
>;

export type UserCredentialsEntityRequiredFields = Pick<
  UserCredentialsEntity,
  'email' | 'password'
>;

export type CreateUserData = UserEntityRequiredFields &
  UserCredentialsEntityRequiredFields;
