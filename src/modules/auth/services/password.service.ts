import { UserCredentialsService } from '@modules/users/services/user-credentials.service';
import { Injectable } from '@nestjs/common';
import { AuthEmailService } from './auth-email.service';
import { CodeService } from './code.service';
import { UserEntity } from '@modules/users/entities/user.entity';
import { AuthTokenService } from '../_modules/token/services /auth-token.service';
import { UserCredentialsEntity } from '@modules/users/entities/user-credential.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  constructor(
    private readonly userCredentialsService: UserCredentialsService,
    private readonly authEmailService: AuthEmailService,
    private readonly authTokenService: AuthTokenService,
    private readonly codeService: CodeService,
  ) { }

  async resetPasswordRequest(email: string) {
    const code = this.codeService.generateCode();
    const hashedCode = await this.codeService.hashCode(code);

    Promise.all([
      this.authEmailService.sendPasswordReset(email, code),
      this.userCredentialsService.setPasswordResetCode(email, hashedCode),
    ]);
  }

  async verifyResetCode(user: UserEntity, code: string) {
    const isCodeValid = await this.codeService.compareCode(
      code,
      user.credentials.resetPasswordCode || '',
    );

    if (!isCodeValid) {
      return null;
    }

    const token = await this.authTokenService.generatePasswordResetToken({
      email: user.credentials.email,
    });

    await this.userCredentialsService.setPasswordResetToken(
      user.credentials.email,
      token,
    );

    return token;
  }

  async verifyResetPasswordToken(
    token: string,
  ): Promise<UserCredentialsEntity | null> {
    const payload = await this.authTokenService.verifyPasswordResetToken(token);

    if (!payload) {
      return null;
    }

    const userCredentials = await this.userCredentialsService.findByEmail(
      payload.email,
    );

    if (!userCredentials || userCredentials.resetPasswordToken !== token) {
      return null;
    }

    return userCredentials;
  }

  resetPassword(
    userCredentials: UserCredentialsEntity,
    password: string,
  ): Promise<boolean> {
    return this.userCredentialsService.changePassword(
      userCredentials.id,
      password,
    );
  }
}
