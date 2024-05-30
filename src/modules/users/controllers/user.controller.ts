import { CurrentUser } from '@modules/auth/decorators/current-user.decorator';
import { Controller, Get } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

@Controller('users')
export class UserController {
  @Get('me')
  async me(@CurrentUser() user: UserEntity) {
    const { credentials, ...userData } = user;
    return {
      ...userData,
      email: credentials.email,
    };
  }
}
