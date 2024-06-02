import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ConfirmEmailDto } from '../dto/confirm-email.dto';
import { UserService } from '@modules/users/services/user.service';
import { validateByClassOrThrow } from '@modules/common/utils/validation.utils';
import { ConfirmEmailBody } from '../types/auth.type';

@Injectable()
export class ConfirmEmailValidationPipe implements PipeTransform {
  constructor(private readonly userService: UserService) { }

  async transform(value: unknown): Promise<ConfirmEmailBody> {
    const body = await validateByClassOrThrow(ConfirmEmailDto, value);
    const { email } = body;

    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('User with this email does not exist');
    }

    if (user.credentials.isEmailConfirmed) {
      throw new BadRequestException('Email is already confirmed');
    }

    if (
      !user.credentials.resetPasswordCode ||
      user.credentials.isEmailConfirmationCodeExpired
    ) {
      throw new BadRequestException(
        'Reset password code is invalid or expired',
      );
    }

    return {
      user,
      code: body.code,
    };
  }
}
