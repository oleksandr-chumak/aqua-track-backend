import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UserCredentialsEntity } from './entities/user-credential.entity';
import { UserController } from './controllers/user.controller';
import { UserCredentialsService } from './services/user-credentials.service';
import { UserCredentialsRepository } from './repositories/user-credentials.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserCredentialsEntity])],
  controllers: [UserController],
  providers: [
    UserRepository,
    UserCredentialsRepository,
    UserService,
    UserCredentialsService,
  ],
  exports: [UserRepository, UserService, UserCredentialsService],
})
export class UserModule {}
