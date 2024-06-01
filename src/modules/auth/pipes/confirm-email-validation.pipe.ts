import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { AuthTokenService } from '../_modules/token/services /auth-token.service';
import { ConfirmEmailDto } from '../dto/confirm-email.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { UserService } from '@modules/users/services/user.service';
import { TransformedConfirmEmailBody } from '../types/auth.type';

@Injectable()
export class ConfirmEmailValidationPipe implements PipeTransform {
  constructor(
    private readonly authTokensService: AuthTokenService,
    private readonly userService: UserService,
  ) {}

  async transform(value: unknown): Promise<TransformedConfirmEmailBody> {
    const body = plainToClass(ConfirmEmailDto, value);

    const result = await validate(body);

    const errorMessages = result.flatMap(({ constraints }) =>
      Object.values(constraints || {}),
    );

    if (result.length > 0) {
      throw new BadRequestException(errorMessages);
    }

    const { token } = body;
    const payload =
      await this.authTokensService.verifyEmailConfirmationToken(token);

    if (!payload) {
      throw new BadRequestException('Token is invalid');
    }

    const user = await this.userService.findUserByEmail(payload.email);

    if (!user) {
      throw new BadRequestException('Token is invalid');
    }

    if (user.credentials.isEmailConfirmed) {
      throw new BadRequestException('Email is already confirmed');
    }

    return {
      code: body.code,
      hashedCode: payload.code,
      user: user,
    };
  }
}
