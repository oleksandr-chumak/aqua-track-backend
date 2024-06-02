import { EmailService } from '@modules/email/services/email.service';
import { Injectable } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class AuthEmailService {
  constructor(private readonly emailService: EmailService) { }

  async sendEmailConfirmation(email: string, code: string) {
    const template = await this.emailService.getHandlebarTemplate(
      path.join(
        process.cwd(),
        'dist/handlebars/auth/email-confirmation.template.hbs',
      ),
    );

    const html = template({ code });

    return this.emailService.sendMail({
      to: email,
      subject: 'Email confirmation',
      html,
    });
  }

  async sendPasswordReset(email: string, code: string) {
    const template = await this.emailService.getHandlebarTemplate(
      path.join(
        process.cwd(),
        'dist/handlebars/auth/password-reset.template.hbs',
      ),
    );

    const html = template({ code });

    return this.emailService.sendMail({
      to: email,
      subject: 'Password reset',
      html,
    });
  }

  async sendRegistrationSuccess(email: string) { }
}
