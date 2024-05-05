import {
  IUserRequest,
  IRequestWhitUser,
} from '../../common/interfaces/requestUser.interface';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!role) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest<IRequestWhitUser>();

    if (user.role === Role.Admin && role !== Role.SuperAdmin) {
      return true;
    }
    if (user.role === Role.SuperAdmin) {
      return true;
    }

    return role === user.role;
  }
}
