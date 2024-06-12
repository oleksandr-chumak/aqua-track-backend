import { Gender } from '@modules/users/types/user.type';
import { IsEnum, IsNumber } from 'class-validator';

export class SetupProfileDto {
  @IsEnum(Gender)
  gender: Gender;

  @IsNumber()
  weight: number;

  @IsNumber()
  physicalActivityTime: number;

  @IsNumber()
  waterConsumption: number;
}
