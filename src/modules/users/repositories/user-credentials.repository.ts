import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentialsEntity } from '../entities/user-credential.entity';

@Injectable()
export class UserCredentialsRepository extends Repository<UserCredentialsEntity> {
  constructor(
    @InjectRepository(UserCredentialsEntity)
    repository: Repository<UserCredentialsEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
