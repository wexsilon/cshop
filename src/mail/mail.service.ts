import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { Transporter, createTransport } from 'nodemailer';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';

import util from 'util';
import { EmailVerify } from './entities/email.verify.entity';

@Injectable()
export class MailService {
  transporter: Transporter;
  companyEmail: string;
  verifyTemplate: string;

  constructor(
    @InjectRepository(EmailVerify)
    private readonly emailyVerifyRepository: Repository<EmailVerify>,
    private readonly configService: ConfigService,
  ) {
    this.companyEmail = this.configService.get<string>('EMAIL_USER');
    this.transporter = createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      secure: false,
      auth: {
        user: this.companyEmail,
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
      socketTimeout: 120000,
    });
    this.verifyTemplate = `<a href="http://${this.configService.get<string>(
      'APP_HOST',
    )}:${this.configService.get<number>(
      'APP_PORT',
    )}/auth/verify/%s">verify</a>`;
  }

  async sendEmailVerify(email: string) {
    const newEmailVerify = await this.emailyVerifyRepository.save({
      email,
      token: randomUUID(),
      timestamp: new Date(),
    });

    return this.transporter.sendMail({
      from: this.companyEmail,
      to: email,
      subject: 'Verify Acount',
      html: util.format(this.verifyTemplate, newEmailVerify.token),
    });
  }

  findOneEmailVerify(token: string) {
    return this.emailyVerifyRepository.findOneBy({ token });
  }

  removeEmailVerify(id: number) {
    return this.emailyVerifyRepository.delete(id);
  }
}
