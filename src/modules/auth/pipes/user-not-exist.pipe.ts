import { UserService } from '@modules/users/services/user.service';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { LocalRegistrationDto } from '../dto/registration/local-registration.dto';

@Injectable()
export class UserNotExistPipe implements PipeTransform {
  constructor(private readonly userService: UserService) { }

  async transform(dto: LocalRegistrationDto) {
    const isUserExists = await this.userService.checkIfUserExists(dto.email);

    if (isUserExists) {
      throw new BadRequestException('User with this email already exists');
    }

    return dto;
  }
}
