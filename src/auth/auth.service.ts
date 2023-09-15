import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import argon2 from 'argon2';

import { RegisterAuthDto } from './dtos/register-auth.dto';
import { UserInfoAuthDto } from './dtos/userinfo-auth.dto';
import { MailService } from 'src/mail/mail.service';
import { UserService } from 'src/user/user.service';
import {
  EmailNotVerified,
  NotFoundVerifyToken,
  UserExists,
} from './responses/error-response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async validateUser(
    usernameOrEmail: string,
    password: string,
  ): Promise<UserInfoAuthDto | null> {
    const u = await this.userService.findOneByEmailOrUsername(
      usernameOrEmail,
      usernameOrEmail,
    );

    if (u) {
      if (u.emailVerfied) {
        if (await argon2.verify(u.password, password)) {
          return {
            id: u.id,
            username: u.username,
            email: u.email,
            isAdmin: u.isAdmin,
          };
        }
        return null;
      }
      throw new EmailNotVerified();
    }
    return null;
  }

  async register(registerAuthDto: RegisterAuthDto) {
    const user = await this.userService.findOneByEmailOrUsername(
      registerAuthDto.email,
      registerAuthDto.username,
    );
    if (user) {
      throw new UserExists(
        `${registerAuthDto.email === user.email ? 'email' : 'username'}`,
      );
    }
    registerAuthDto.password = await argon2.hash(registerAuthDto.password);
    const userCreated = await this.userService.create(registerAuthDto);
    this.mailService.sendEmailVerify(userCreated.email);
    return { message: 'new user created' };
  }

  async login(user: UserInfoAuthDto) {
    return { access_token: this.jwtService.sign(user) };
  }

  async verify(token: string) {
    const emailVerify = await this.mailService.findOneEmailVerify(token);
    if (emailVerify) {
      const user = await this.userService.findOneByEmailOrUsername(
        emailVerify.email,
        emailVerify.email,
      );
      user.emailVerfied = true;
      await this.userService.update(user);
      this.mailService.removeEmailVerify(emailVerify.id);
      return { message: 'email succssful verified' };
    }
    throw new NotFoundVerifyToken();
  }
}
