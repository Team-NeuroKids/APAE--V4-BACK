import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  },
})
export class SessionGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private configService: ConfigService) { }

  private logger: Logger = new Logger(SessionGateway.name);

  afterInit(server: Server) {
    const env = this.configService.getOrThrow<string>('NODE_ENV');

    if (env === 'development') {
      this.logger.log('Development mode');
    }

    this.logger.log('Initialized');
  }

handleConnection(client: Socket) {
  this.logger.log(`Client connected: ${client.id}`);
}

handleDisconnect(client: Socket) {
  this.logger.log(`Client disconnected: ${client.id}`);
}

@SubscribeMessage('session-status')
handleMessage(client: Socket, payload: any): string {
  this.logger.log(payload);
  return 'Hello world!';
}
}
