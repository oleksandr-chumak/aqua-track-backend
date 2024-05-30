import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserData } from '../types/user.type';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    repository: Repository<UserEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createUser(data: CreateUserData): Promise<UserEntity> {
    const user = super.create({
      name: data.name,
      credentials: {
        email: data.email,
        password: data.password,
      },
    });

    return super.save(user);
  }
}
