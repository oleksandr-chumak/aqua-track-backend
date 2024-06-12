import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UserModule } from '@modules/users/user.module';
import { EmailModule } from '@modules/email/email.module';
import { AuthEmailService } from './services/auth-email.service';
import { TokenModule } from './_modules/token/token.module';
import { AuthTokenService } from './_modules/token/services /auth-token.service';
import { JwtService } from './_modules/token/services /jwt.service';
import { AuthService } from './services/auth.service';
import { CodeService } from './services/code.service';
import { AuthRegistrationController } from './controllers/auth-registration.controller';

@Module({
  imports: [UserModule, EmailModule, TokenModule],
  controllers: [AuthController, AuthRegistrationController],
  providers: [
    CodeService,
    AuthService,
    AuthTokenService,
    JwtService,
    AuthEmailService,
  ],
  exports: [AuthTokenService],
})
export class AuthModule {}
