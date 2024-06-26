import { Module } from '@nestjs/common';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { AuthTokenService } from './services /auth-token.service';
import { PasswordResetTokenStrategy } from './strategies/password-reset-token.strategy';

@Module({
  imports: [],
  controllers: [],
  providers: [
    AccessTokenStrategy,
    RefreshTokenStrategy,
    PasswordResetTokenStrategy,
    AuthTokenService,
  ],
  exports: [AuthTokenService],
})
export class TokenModule {}
