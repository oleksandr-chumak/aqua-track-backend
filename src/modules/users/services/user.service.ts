import { Injectable } from '@nestjs/common';
import { CreateUserData } from '../types/user.type';
import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  async createUser(data: CreateUserData) {
    return this.userRepository.createUser(data);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.credentials.password))) {
      return user;
    }
    return null;
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: { credentials: { email } },
      relations: { credentials: {} },
    });
  }

  async checkIfUserExists(email: string): Promise<boolean> {
    const user = await this.findUserByEmail(email);
    return !!user;
  }
}
