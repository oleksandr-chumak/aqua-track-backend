import { validateByClassOrThrow } from '@modules/common/utils/validation.utils';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Session,
  UsePipes,
} from '@nestjs/common';
import { ConfirmEmailSessionDto } from '../dto/registration/confirm-email-session.dto';
import { LocalRegistrationDto } from '../dto/registration/local-registration.dto';
import { UserNotExistPipe } from '../pipes/user-not-exist.pipe';
import { RegistrationStep, ConfirmEmailBody } from '../types/auth.type';
import { AuthService } from '../services/auth.service';
import { SetupProfileDto } from '../dto/registration/setup-profile.dto';
import { SetupProfileSessionDto } from '../dto/registration/setup-profile-session.dto';
import { NoAuth } from '../decorators/no-auth.decorator';
import { UserService } from '@modules/users/services/user.service';

@Controller('auth/registration')
@NoAuth()
export class AuthRegistrationController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('initialize')
  @UsePipes(UserNotExistPipe)
  async register(
    @Body() dto: LocalRegistrationDto,
    @Session() session: Record<string, any>,
  ) {
    const [hashedPassword, code] = await Promise.all([
      await this.authService.hashPassword(dto.password),
      await this.authService.sendEmailConfirmationRequest(dto.email),
    ]);

    session.registration = {
      ...dto,
      currentRegistrationStep: RegistrationStep.EmailConfirmation,
      emailConfirmationCode: code,
      isEmailConfirmed: false,
      password: hashedPassword,
    };

    return {
      message: 'Email confirmation code has been sent',
    };
  }

  @Post('confirm-email')
  async confirmEmail(
    @Body() body: ConfirmEmailBody,
    @Session() session: Record<string, any>,
  ) {
    let sessionData: ConfirmEmailSessionDto;
    try {
      sessionData = await validateByClassOrThrow(
        ConfirmEmailSessionDto,
        session.registration || {},
      );
    } catch (error) {
      throw new BadRequestException('Invalid session data');
    }

    const compareResult = await this.authService.compareEmailConfirmationCode(
      body.code,
      sessionData.emailConfirmationCode,
    );

    if (!compareResult) {
      throw new BadRequestException('Invalid confirmation code');
    }

    session.registration = {
      ...sessionData,
      currentRegistrationStep: RegistrationStep.ProfileSetup,
      isEmailConfirmed: true,
    };

    return {
      message: 'Email confirmed',
    };
  }

  @Post('setup-profile')
  async setupProfile(
    @Body() body: SetupProfileDto,
    @Session() session: Record<string, any>,
  ) {
    let sessionData: SetupProfileSessionDto;
    try {
      sessionData = await validateByClassOrThrow(
        SetupProfileSessionDto,
        session.registration || {},
      );
    } catch (error) {
      throw new BadRequestException('Invalid session data');
    }

    const user = await this.userService.createUser({
      email: sessionData.email,
      name: sessionData.name,
      password: sessionData.password,
      gender: body.gender,
      weight: body.weight,
      waterConsumption: body.waterConsumption,
      physicalActivityTime: body.physicalActivityTime,
    });

    session.registration = undefined;

    const { credentials, ...userWithoutCredentials } = user;

    return { ...userWithoutCredentials, email: credentials.email };
  }
}
