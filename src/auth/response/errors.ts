import { UnauthorizedException } from '@nestjs/common';

export class WrongUsernameOrPassword extends UnauthorizedException {
  constructor() {
    super('Username or password is incorrect.');
  }
}
