import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserInfoAuthDto } from './dto/userinfo-auth.dto';
import { JwtService } from '@nestjs/jwt';
import argon2 from 'argon2';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UserExists } from './response/errors';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    usernameOrEmail: string,
    password: string,
  ): Promise<UserInfoAuthDto | null> {
    const u = await this.userService.findOneByEmailOrUsername(
      usernameOrEmail,
      usernameOrEmail,
    );

    if (u && (await argon2.verify(u.password, password))) {
      return { id: u.id, username: u.username, email: u.email };
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
    //const userCreated =
    await this.userService.create(registerAuthDto);
    return { message: 'new user created' };
  }

  async login(user: UserInfoAuthDto) {
    return { access_token: this.jwtService.sign(user) };
  }
}
