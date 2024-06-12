import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LocalLoginDto } from '../dto/local-login.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserEntity } from '@modules/users/entities/user.entity';
import { NoAuth } from '../decorators/no-auth.decorator';
import { AuthTokenService } from '../_modules/token/services /auth-token.service';
import { AuthService } from '../services/auth.service';
@Controller('auth')
@NoAuth()
export class AuthController {
  constructor(
    private readonly authTokenService: AuthTokenService,
    private readonly authService: AuthService,
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
}
