import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { LocalRegisterDto } from '../dto/local-register.dto';
import { UserService } from '@modules/users/services/user.service';
import { UserNotExistPipe } from '../pipes/user-not-exist.pipe';
import { LocalLoginDto } from '../dto/local-login.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserEntity } from '@modules/users/entities/user.entity';
import { NoAuth } from '../decorators/no-auth.decorator';
import { AuthTokenService } from '../_modules/token/services /auth-token.service';
import { AuthService } from '../services/auth.service';
import { ConfirmEmailValidationPipe } from '../pipes/confirm-email-validation.pipe';
import { ConfirmEmailBody } from '../types/auth.type';

@Controller('auth')
@NoAuth()
export class AuthController {
  constructor(
    private readonly userService: UserService,
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

  @Post('register')
  @UsePipes(UserNotExistPipe)
  async register(@Body() dto: LocalRegisterDto) {
    const user = await this.userService.createUser(dto);
    await this.authService.sendEmailConfirmationRequest(user);
  }

  @Post('confirm-email')
  async confirmEmail(@Body(ConfirmEmailValidationPipe) body: ConfirmEmailBody) {
    const confirmationResult = await this.authService.confirmEmail(
      body.user,
      body.code,
    );

    if (!confirmationResult) {
      throw new BadRequestException('Invalid code');
    }

    return true;
  }
}
