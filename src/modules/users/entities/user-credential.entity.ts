import { ExtendedBaseEntity } from '@modules/common/entites/extended-base-entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'user_credentials' })
export class UserCredentialsEntity extends ExtendedBaseEntity {
  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToOne(() => UserEntity, (user) => user.credentials)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ nullable: false })
  userId: number;
}
