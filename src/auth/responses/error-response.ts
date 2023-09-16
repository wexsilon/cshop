import {
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

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

export class EmailNotVerified extends UnauthorizedException {
  constructor() {
    super(
      'Your email is unverified. You need to confirm your email to log in.',
    );
  }
}

export class NotFoundVerifyToken extends NotFoundException {
  constructor() {
    super('Your token does not exist or is incorrect.');
  }
}

export class UnauthenticatedUser extends UnauthorizedException {
  constructor() {
    super('You are not authenticated. Please log in to your account first.');
  }
}
