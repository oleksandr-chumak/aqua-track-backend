import { UserService } from '@modules/users/services/user.service';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LocalLoginDto } from '../dto/local-login.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { RequestWithUser } from '../types/auth.type';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) { }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<RequestWithUser>();

    const body = plainToClass(LocalLoginDto, req.body);
    const errors = await validate(body);
    const errorMessages = errors.flatMap(({ constraints }) =>
      Object.values(constraints || {}),
    );

    if (errors.length > 0) {
      throw new BadRequestException(errorMessages);
    }

    const user = await this.userService.validateUser(body.email, body.password);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    req.user = user;

    return true;
  }
}
