import { ExtendedBaseEntity } from '@modules/common/entites/extended-base-entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'user_credentials' })
export class UserCredentialsEntity extends ExtendedBaseEntity {
  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  emailConfirmationCode: string | null; // hash

  @Column({ type: 'timestamp', nullable: true, default: null })
  emailConfirmationCodeValidTill: Date | null;

  @Column({ type: 'varchar', nullable: true, default: null })
  resetPasswordCode: string | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  resetPasswordCodeValidTill: Date | null;

  @Column({ type: 'varchar', nullable: true, default: null })
  resetPasswordToken: string | null;

  @Column({ nullable: false, default: false })
  isEmailConfirmed: boolean;

  @OneToOne(() => UserEntity, (user) => user.credentials)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ nullable: false })
  userId: number;

  get isEmailConfirmationCodeExpired() {
    return this.emailConfirmationCodeValidTill
      ? Date.now() > this.emailConfirmationCodeValidTill.getTime()
      : true;
  }

  get isResetPasswordCodeExpired() {
    return this.resetPasswordCodeValidTill
      ? Date.now() > this.resetPasswordCodeValidTill.getTime()
      : true;
  }
}
