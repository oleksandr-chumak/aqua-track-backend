import { Injectable } from '@nestjs/common';
import { TokenServiceInterface } from '../interfaces/token-service.interface';
import { AccessTokenPayload } from '../types/token-payload.type';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';
import { JwtService } from '../services /jwt.service';

@Injectable()
export class AccessTokenStrategy
  extends JwtService<AccessTokenPayload>
  implements TokenServiceInterface<AccessTokenPayload>
{
  constructor() {
    const configService = new ConfigService();
    super(
      configService.getOrThrow<string>('ACCESS_TOKEN_SECRET'),
      {
        expiresIn: configService.getOrThrow<string>('ACCESS_TOKEN_EXPIRES_IN'),
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
