import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UserModule } from '@modules/users/user.module';
import { AuthTokenService } from './services/auth-token.service';
import { JwtService } from './services/jwt.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthTokenService, JwtService],
  exports: [AuthTokenService],
})
export class AuthModule {}
