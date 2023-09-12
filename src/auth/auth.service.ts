import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserInfoAuthDto } from './dto/userinfo-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserInfoAuthDto | null> {
    const u = await this.userService.findOne(username);
    if (u && u.password === password) {
      return { id: u.id, username: u.username };
    }
    return null;
  }

  async login(user: UserInfoAuthDto) {
    return { access_token: this.jwtService.sign(user) };
  }
}
