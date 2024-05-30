import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtAuthTokenPayload } from '../types/auth.type';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthTokenService {
  private readonly accessTokenSecret: string;
  private readonly refreshTokenSecret: string;
  private readonly accessTokenExpiresIn: string;
  private readonly refreshTokenExpiresIn: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.accessTokenSecret = this.configService.get<string>(
      'ACCESS_TOKEN_SECRET',
    );
    this.refreshTokenSecret = this.configService.get<string>(
      'REFRESH_TOKEN_SECRET',
    );
    this.accessTokenExpiresIn = this.configService.get<string>(
      'ACCESS_TOKEN_EXPIRES_IN',
    );
    this.refreshTokenExpiresIn = this.configService.get<string>(
      'REFRESH_TOKEN_EXPIRES_IN',
    );
  }
  generateAccessToken(payload: JwtAuthTokenPayload): Promise<string> {
    return this.jwtService.sign(payload, this.accessTokenSecret, {
      expiresIn: this.accessTokenExpiresIn,
    });
  }

  generateRefreshToken(payload: JwtAuthTokenPayload): Promise<string> {
    return this.jwtService.sign(payload, this.refreshTokenSecret, {
      expiresIn: this.refreshTokenExpiresIn,
    });
  }

  verifyAccessToken(accessToken: string): Promise<JwtAuthTokenPayload | null> {
    return this.jwtService.verify(accessToken, this.accessTokenSecret, {
      ignoreExpiration: false,
    }) as Promise<JwtAuthTokenPayload | null>;
  }

  verifyRefreshToken(
    refreshToken: string,
  ): Promise<JwtAuthTokenPayload | null> {
    return this.jwtService.verify(refreshToken, this.refreshTokenSecret, {
      ignoreExpiration: false,
    }) as Promise<JwtAuthTokenPayload | null>;
  }
}
