import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '@modules/users/entities/user.entity';
import { RequestWithUser } from '../types/auth.type';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserEntity => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);
