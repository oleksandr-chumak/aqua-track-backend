import { UserService } from '@modules/users/services/user.service';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { LocalRegisterDto } from '../dto/local-register.dto';

@Injectable()
export class UserNotExistPipe implements PipeTransform {
  constructor(private readonly userService: UserService) { }

  async transform(dto: LocalRegisterDto) {
    const isUserExists = await this.userService.checkIfUserExists(dto.email);

    if (isUserExists) {
      throw new BadRequestException('User with this email already exists');
    }

    return dto;
  }
}
