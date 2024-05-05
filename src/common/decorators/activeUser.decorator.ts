import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IRequestWhitUser } from 'src/common/interfaces/requestUser.interface';

export const ActiveUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<IRequestWhitUser>();
    return request.user;
  },
);
