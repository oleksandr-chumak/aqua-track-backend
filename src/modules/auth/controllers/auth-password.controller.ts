import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { NoAuth } from '../decorators/no-auth.decorator';
import { ResetPasswordRequestValidationPipe } from '../pipes/reset-password-request-validation.pipe';
import {
  ResetPasswordBody,
  ResetPasswordRequestBody,
  VerifyResetPasswordCodeBody,
} from '../types/auth.type';
import { PasswordService } from '../services/password.service';
import { ResetPasswordValidationPipe } from '../pipes/reset-password.pipe';

@Controller('auth/password')
@NoAuth()
export class AuthPasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post('reset-request')
  async resetPasswordRequest(
    @Body(ResetPasswordRequestValidationPipe) body: ResetPasswordRequestBody,
  ) {
    await this.passwordService.resetPasswordRequest(
      body.user.credentials.email,
    );
  }

  @Post('verify-reset-code')
  async verifyResetCode(@Body() body: VerifyResetPasswordCodeBody) {
    const token = await this.passwordService.verifyResetCode(
      body.user,
      body.code,
    );

    if (!token) {
      throw new BadRequestException('Invalid code');
    }

    return {
      token,
    };
  }

  @Post('reset')
  async resetPassword(
    @Body(ResetPasswordValidationPipe) body: ResetPasswordBody,
  ) {
    const result = this.passwordService.resetPassword(
      body.userCredentials,
      body.newPassword,
    );

    if (!result) {
      // failed to reset password unknown error not bad request error
      throw new BadRequestException('Failed to reset password');
    }
  }
}
