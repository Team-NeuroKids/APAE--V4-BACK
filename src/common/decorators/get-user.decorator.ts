import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/auth/types';

export const GetUser = createParamDecorator(
  (data: keyof JwtPayload, ctx: ExecutionContext) => {
    const request: Request & { user: JwtPayload } = ctx
      .switchToHttp()
      .getRequest();

    return request.user[data];
  },
);
