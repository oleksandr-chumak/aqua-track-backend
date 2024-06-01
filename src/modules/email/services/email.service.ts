import { Transporter, createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { Info } from '../types/email.type';
import * as fs from 'fs/promises';
import * as Handlebars from 'handlebars';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendMail(options: Mail.Options): Promise<Info> {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(options, (error, info: Info) => {
        if (error) {
          this.logger.error(`Error sending email: ${error}`);
          reject(error);
        }
        this.logger.log(`Email sent: ${info.response}`);
        resolve(info);
      });
    });
  }

  async getHandlebarTemplate(absolutePath: string) {
    const templateSource = await fs.readFile(absolutePath, {
      encoding: 'utf8',
    });

    return Handlebars.compile(templateSource);
  }
}
