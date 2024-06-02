import { Injectable } from '@nestjs/common';
import { UserCredentialsRepository } from '../repositories/user-credentials.repository';
import { add } from 'date-fns';
import * as bcrypt from 'bcrypt';
import { UserCredentialsEntity } from '../entities/user-credential.entity';

@Injectable()
export class UserCredentialsService {
  constructor(
    private readonly userCredentialsRepository: UserCredentialsRepository,
  ) {}

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
      {
        emailConfirmationCode: code,
        emailConfirmationCodeValidTill: add(new Date(), { hours: 1 }),
      },
    );
    return result.affected === 1;
  }

  async setPasswordResetCode(email: string, code: string): Promise<boolean> {
    const result = await this.userCredentialsRepository.update(
      { email },
      {
        resetPasswordCode: code,
        resetPasswordCodeValidTill: add(new Date(), { hours: 1 }),
      },
    );
    return result.affected === 1;
  }

  async setPasswordResetToken(email: string, token: string): Promise<boolean> {
    const result = await this.userCredentialsRepository.update(
      { email },
      {
        resetPasswordToken: token,
        resetPasswordCode: null,
        resetPasswordCodeValidTill: null,
      },
    );
    return result.affected === 1;
  }

  async findByEmail(email: string): Promise<UserCredentialsEntity | null> {
    return this.userCredentialsRepository.findOneBy({ email });
  }

  async changePassword(id: number, password: string): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await this.userCredentialsRepository.update(id, {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordCode: null,
      resetPasswordCodeValidTill: null,
    });
    return result.affected === 1;
  }
}
