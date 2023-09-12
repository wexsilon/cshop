import { UnauthorizedException, ConflictException } from '@nestjs/common';

export class WrongUsernameOrPassword extends UnauthorizedException {
  constructor() {
    super('Username or password is incorrect.');
  }
}

export class UserExists extends ConflictException {
  constructor(field: string) {
    super(`Another user with this ${field} already exists.`);
  }
}
