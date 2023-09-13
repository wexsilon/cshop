import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailVerify } from './entities/email.verify.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailVerify])],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
