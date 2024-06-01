import { Injectable } from '@nestjs/common';
import { TokenServiceInterface } from '../interfaces/token-service.interface';
import { EmailConfirmationTokenPayload } from '../types/token-payload.type';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';
import { JwtService } from '../services /jwt.service';

@Injectable()
export class EmailConfirmationTokenStrategy
  extends JwtService<EmailConfirmationTokenPayload>
  implements TokenServiceInterface<EmailConfirmationTokenPayload>
{
  constructor() {
    const configService = new ConfigService();
    super(
      configService.getOrThrow<string>('EMAIL_CONFIRMATION_TOKEN_SECRET'),
      {
        expiresIn: configService.getOrThrow<string>(
          'EMAIL_CONFIRMATION_TOKEN_EXPIRES_IN',
        ),
      },
      z
        .object({
          email: z.string().email(),
          code: z.string(),
          exp: z.number(),
          iat: z.number(),
        })
        .required()
        .strict(),
    );
  }
}
