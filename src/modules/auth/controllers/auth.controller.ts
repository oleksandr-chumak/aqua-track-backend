import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { LocalRegisterDto } from '../dto/local-register.dto';
import { UserService } from '@modules/users/services/user.service';
import { UserNotExistPipe } from '../pipes/user-not-exist.pipe';
import { LocalLoginDto } from '../dto/local-login.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserEntity } from '@modules/users/entities/user.entity';
import { AuthTokenService } from '../services/auth-token.service';
import { NoAuth } from '../decorators/no-auth.decorator';

@Controller('auth')
@NoAuth()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authTokenService: AuthTokenService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() _: LocalLoginDto, @CurrentUser() user: UserEntity) {
    const [accessToken, refreshToken] = await Promise.all([
      this.authTokenService.generateAccessToken({ id: user.id }),
      this.authTokenService.generateRefreshToken({ id: user.id }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  @Post('register')
  @UsePipes(UserNotExistPipe)
  async register(@Body() dto: LocalRegisterDto) {
    const user = await this.userService.createUser(dto);
    return {
      id: user.id,
      email: user.credentials.email,
      name: user.name,
    };
  }
}
