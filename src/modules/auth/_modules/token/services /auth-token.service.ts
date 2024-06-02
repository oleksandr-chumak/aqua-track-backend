import { Injectable } from '@nestjs/common';
import {
  AccessTokenPayload,
  EmailConfirmationTokenPayload,
  PasswordResetTokenPayload,
  RefreshTokenPayload,
} from '../types/token-payload.type';
import { AccessTokenStrategy } from '../strategies/access-token.strategy';
import { RefreshTokenStrategy } from '../strategies/refresh-token.strategy';
import { TokenContext } from '../contexts/token.context';
import { PasswordResetTokenStrategy } from '../strategies/password-reset-token.strategy';

@Injectable()
export class AuthTokenService {
  private readonly accessTokenService: TokenContext<AccessTokenPayload>;
  private readonly refreshTokenService: TokenContext<AccessTokenPayload>;
  private readonly passwordResetTokenService: TokenContext<PasswordResetTokenPayload>;

  constructor() {
    this.accessTokenService = new TokenContext(new AccessTokenStrategy());
    this.refreshTokenService = new TokenContext(new RefreshTokenStrategy());
    this.passwordResetTokenService = new TokenContext(
      new PasswordResetTokenStrategy(),
    )
  }

  generateAccessToken(payload: AccessTokenPayload): Promise<string> {
    return this.accessTokenService.sign(payload);
  }

  generateRefreshToken(payload: AccessTokenPayload): Promise<string> {
    return this.refreshTokenService.sign(payload);
  }

  generatePasswordResetToken(
    payload: PasswordResetTokenPayload,
  ): Promise<string> {
    return this.passwordResetTokenService.sign(payload);
  }

  verifyAccessToken(accessToken: string): Promise<AccessTokenPayload | null> {
    return this.accessTokenService.verify(accessToken);
  }

  verifyRefreshToken(
    refreshToken: string,
  ): Promise<RefreshTokenPayload | null> {
    return this.refreshTokenService.verify(refreshToken);
  }

  verifyPasswordResetToken(
    passwordResetToken: string,
  ): Promise<PasswordResetTokenPayload | null> {
    return this.passwordResetTokenService.verify(passwordResetToken);
  }
}
