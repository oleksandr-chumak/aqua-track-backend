import { Injectable, Logger } from '@nestjs/common';
import { AuthTokenService } from '../_modules/token/services /auth-token.service';
import { AuthEmailService } from './auth-email.service';
import { UserEntity } from '@modules/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserCredentialsService } from '@modules/users/services/user-credentials.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly authEmailService: AuthEmailService,
    private readonly authTokenService: AuthTokenService,
    private readonly userCredentialsService: UserCredentialsService,
  ) { }

  async sendEmailConfirmationRequest(user: UserEntity) {
    const code = this.generateCode();
    const hashedCode = await bcrypt.hash(code, 10);

    const [token] = await Promise.all([
      this.authTokenService.generateEmailConfirmationToken({
        email: user.credentials.email,
        code: hashedCode,
      }),
      this.authEmailService.sendEmailConfirmation(user.credentials.email, code),
      this.userCredentialsService.setEmailConfirmationCode(
        user.credentials.email,
        code,
      ),
    ]);

    return { token };
  }

  async confirmEmail(email: string, hashCode: string, code: string) {
    const isCodeValid = await bcrypt.compare(code, hashCode);

    if (!isCodeValid) {
      return false;
    }

    const result = await this.userCredentialsService.confirmEmail(email);

    if (!result) {
      this.logger.error(`Email confirmation failed for ${email}`);
      return false;
    }

    return true;
  }

  private generateCode(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const codeLength = 6;
    let result = '';

    for (let i = 0; i < codeLength; i++) {
      const isLetter = Math.random() < 0.5;
      if (isLetter) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        result += letters[randomIndex];
      } else {
        const randomIndex = Math.floor(Math.random() * digits.length);
        result += digits[randomIndex];
      }
    }

    return result;
  }
}
