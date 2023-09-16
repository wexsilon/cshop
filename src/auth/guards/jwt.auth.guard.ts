import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UnauthenticatedUser } from '../responses/error-response';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    const isAuth = (await super.canActivate(context)) as boolean;
    if (isAuth) return isAuth;
    throw new UnauthenticatedUser();
  }
}
