import { UserEntity } from '@modules/users/entities/user.entity';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: UserEntity;
}

export interface JwtAuthTokenPayload {
  id: number;
}
