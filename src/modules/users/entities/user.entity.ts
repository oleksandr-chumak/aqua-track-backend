import { ExtendedBaseEntity } from '@modules/common/entites/extended-base-entity';
import { Column, Entity } from 'typeorm';
import { Gender } from '../types/user.type';

@Entity({ name: 'users' })
export class UserEntity extends ExtendedBaseEntity {
  /**
   * @description Email of the user
   * @example test@gmail.com
   */
  @Column({ nullable: false, unique: true })
  email: string;

  /**
   * @description Gender of the user
   * @example male
   */
  @Column({ type: 'enum', enum: Gender, nullable: false })
  gender: Gender;

  /**
   * @description Weight of the user in kilograms
   * @example 75.3 or null
   */
  @Column({
    type: 'decimal',
    precision: 3,
    scale: 2,
    nullable: true,
    default: null,
  })
  weight: number | null;

  /**
   * @description Name of the user
   * @example Denis Prokopenko
   */
  @Column({ nullable: false })
  name: string;

  /**
   * @description Time of the user's physical activity in hours
   * @example 2 or null
   */
  @Column({ nullable: true, default: null })
  physicalActivityTime: number | null;

  /**
   * @description Water consumption of the user in liters
   * @example 1.8 | null
   */
  @Column({
    type: 'decimal',
    precision: 2,
    scale: 2,
    nullable: true,
    default: null,
  })
  waterConsumption: number | null;
}
