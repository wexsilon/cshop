import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AdminArea } from '../responses/error-response';

@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    if (req.user.isAdmin) return true;
    throw new AdminArea();
  }
}
