import { validateByClassOrThrow } from '@modules/common/utils/validation.utils';
import { UserService } from '@modules/users/services/user.service';
import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { ResetPasswordRequestDto } from '../dto/reset-password-request.dto';

@Injectable()
export class ResetPasswordRequestValidationPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}

  async transform(value: unknown) {
    const body = await validateByClassOrThrow(ResetPasswordRequestDto, value);

    const user = await this.userService.findUserByEmail(body.email);

    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }

    return {
      user,
    };
  }
}
