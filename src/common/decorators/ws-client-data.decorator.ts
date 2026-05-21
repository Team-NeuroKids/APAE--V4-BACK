import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { AuthSocket, WsClientData } from 'src/websocket/types';

export const GetWsClientData = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): WsClientData => {
    const client = ctx.switchToWs().getClient<AuthSocket>();

    return {
      sessionId: client.data.sessionId as string,
      childId: client.data.childId as string,
    };
  },
);
