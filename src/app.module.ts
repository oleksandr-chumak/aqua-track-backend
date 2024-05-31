import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from '@modules/users/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { EmailModule } from '@modules/email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DatabaseModule,
    EmailModule,
    UserModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
