import { Role } from '../enums/rol.enum';
import { UseGuards, applyDecorators } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';

export function Auth(role: Role) {
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
}
