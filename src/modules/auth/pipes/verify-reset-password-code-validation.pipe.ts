import { validateByClassOrThrow } from '@modules/common/utils/validation.utils';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { VerifyResetPasswordCodeDto } from '../dto/verify-reset-password-code.dto';
import { UserService } from '@modules/users/services/user.service';
import { VerifyResetPasswordCodeBody } from '../types/auth.type';

@Injectable()
export class VerifyResetPasswordCodeValidationPipe implements PipeTransform {
  constructor(private readonly userService: UserService) { }

  async transform(value: unknown): Promise<VerifyResetPasswordCodeBody> {
    const body = await validateByClassOrThrow(
      VerifyResetPasswordCodeDto,
      value,
    );

    const user = await this.userService.findUserByEmail(body.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (
      !user.credentials.resetPasswordCode ||
      user.credentials.isResetPasswordCodeExpired
    ) {
      throw new BadRequestException(
        'Reset password code is invalid or expired',
      );
    }

    return {
      user: user,
      code: body.code,
    };
  }
}
