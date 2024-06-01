import { Injectable } from '@nestjs/common';
import { TokenServiceInterface } from '../interfaces/token-service.interface';
import { RefreshTokenPayload } from '../types/token-payload.type';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';
import { JwtService } from '../services /jwt.service';

@Injectable()
export class RefreshTokenStrategy
  extends JwtService<RefreshTokenPayload>
  implements TokenServiceInterface<RefreshTokenPayload>
{
  constructor() {
    const configService = new ConfigService();
    super(
      configService.getOrThrow<string>('REFRESH_TOKEN_SECRET'),
      {
        expiresIn: configService.getOrThrow<string>('REFRESH_TOKEN_EXPIRES_IN'),
      },
      z
        .object({
          id: z.number(),
          exp: z.number(),
          iat: z.number(),
        })
        .required()
        .strict(),
    );
  }
}
