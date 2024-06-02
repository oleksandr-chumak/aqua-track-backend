import { validateByClassOrThrow } from '@modules/common/utils/validation.utils';
import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { PasswordService } from '../services/password.service';
import { ResetPasswordBody } from '../types/auth.type';

export class ResetPasswordValidationPipe implements PipeTransform {
  constructor(private readonly passwordService: PasswordService) {}

  async transform(value: unknown): Promise<ResetPasswordBody> {
    const body = await validateByClassOrThrow(ResetPasswordDto, value);

    const userCredentials = await this.passwordService.verifyResetPasswordToken(
      body.token,
    );

    if (!userCredentials) {
      throw new BadRequestException('Invalid token');
    }

    return {
      userCredentials,
      newPassword: body.newPassword,
    };
  }
}
