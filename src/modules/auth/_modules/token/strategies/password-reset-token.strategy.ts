import { Injectable } from '@nestjs/common';
import { TokenServiceInterface } from '../interfaces/token-service.interface';
import { PasswordResetTokenPayload } from '../types/token-payload.type';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';
import { JwtService } from '../services /jwt.service';

@Injectable()
export class PasswordResetTokenStrategy
  extends JwtService<PasswordResetTokenPayload>
  implements TokenServiceInterface<PasswordResetTokenPayload>
{
  constructor() {
    const configService = new ConfigService();
    super(
      configService.getOrThrow<string>('PASSWORD_RESET_TOKEN_SECRET'),
      {
        expiresIn: configService.getOrThrow<string>(
          'PASSWORD_RESET_TOKEN_EXPIRES_IN',
        ),
      },
      z
        .object({
          email: z.string().email(),
          code: z.string().length(6),
          exp: z.number(),
          iat: z.number(),
        })
        .required()
        .strict(),
    );
  }
}
