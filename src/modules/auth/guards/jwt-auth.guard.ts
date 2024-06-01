import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RequestWithUser } from '../types/auth.type';
import { UserRepository } from '@modules/users/repositories/user.repository';
import { Reflector } from '@nestjs/core';
import { AuthTokenService } from '../_modules/token/services /auth-token.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authTokenService: AuthTokenService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const noAuthMethod = this.reflector.get<boolean>(
      'no-auth',
      context.getHandler(),
    );
    const noAuthClass = this.reflector.get<boolean>(
      'no-auth',
      context.getClass(),
    );

    if (noAuthClass || noAuthMethod) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();

    const authorization = request.headers['authorization']?.split(' ');
    const type = authorization?.[0];
    const token = authorization?.[1];

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Token not found');
    }

    const payload = await this.authTokenService.verifyAccessToken(token);

    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.userRepository.findOne({
      where: { id: payload.id },
      relations: { credentials: {} },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    request.user = user;

    return true;
  }
}
