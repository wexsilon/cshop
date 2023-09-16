import { UnauthorizedException } from '@nestjs/common';

export class AdminArea extends UnauthorizedException {
  constructor() {
    super(
      'You do not have access to this page; only the admin can access this page.',
    );
  }
}
