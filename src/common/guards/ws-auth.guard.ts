import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { AuthSocket } from 'src/websocket/types';

@Injectable()
export class WsAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient<AuthSocket>();
    const sessionId = client.data.sessionId;
    const childId = client.data.childId;

    if (!sessionId || !childId) {
      throw new WsException('Sessão inválida ou não autorizada');
    }
    return true;
  }
}
