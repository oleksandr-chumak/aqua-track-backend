import { Injectable } from '@nestjs/common';
import { UserCredentialsRepository } from '../repositories/user-credentials.repository';

@Injectable()
export class UserCredentialsService {
  constructor(
    private readonly userCredentialsRepository: UserCredentialsRepository,
  ) { }

  async confirmEmail(email: string): Promise<boolean> {
    const result = await this.userCredentialsRepository.update(
      { email },
      { isEmailConfirmed: true },
    );

    return result.affected === 1;
  }

  async setEmailConfirmationCode(
    email: string,
    code: string,
  ): Promise<boolean> {
    const result = await this.userCredentialsRepository.update(
      { email },
      { emailConfirmationCode: code },
    );

    return result.affected === 1;
  }
}
