import { Injectable, Logger } from '@nestjs/common';
import { AuthTokenService } from '../_modules/token/services /auth-token.service';
import { AuthEmailService } from './auth-email.service';
import { UserEntity } from '@modules/users/entities/user.entity';
import { UserCredentialsService } from '@modules/users/services/user-credentials.service';
import { CodeService } from './code.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly authEmailService: AuthEmailService,
    private readonly userCredentialsService: UserCredentialsService,
    private readonly codeService: CodeService,
  ) { }

  async sendEmailConfirmationRequest(user: UserEntity) {
    const code = this.codeService.generateCode();
    const hashedCode = await this.codeService.hashCode(code);

    await Promise.all([
      this.authEmailService.sendEmailConfirmation(user.credentials.email, code),
      this.userCredentialsService.setEmailConfirmationCode(
        user.credentials.email,
        hashedCode,
      ),
    ]);
  }

  async confirmEmail(user: UserEntity, code: string) {
    const isCodeValid = this.codeService.compareCode(
      code,
      user.credentials.emailConfirmationCode || '',
    );

    if (!isCodeValid) {
      return false;
    }

    const result = await this.userCredentialsService.confirmEmail(
      user.credentials.email,
    );

    if (!result) {
      this.logger.error(
        `Email confirmation failed for ${user.credentials.email}`,
      );
      return false;
    }

    return true;
  }
}
