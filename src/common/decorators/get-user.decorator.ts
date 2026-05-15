import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from 'src/auth/types';

export const GetUser = createParamDecorator(
  (data: keyof AuthUser, ctx: ExecutionContext) => {
    const request: Request & { user: AuthUser } = ctx
      .switchToHttp()
      .getRequest();

    return request.user;
  },
);
