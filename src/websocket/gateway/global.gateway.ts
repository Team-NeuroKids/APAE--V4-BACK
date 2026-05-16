import { Logger, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsAuthGuard } from '../../common/guards/ws-auth.guard';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:4000',
    credentials: true,
  },
})
export class GlobalGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private configService: ConfigService) {}

  private logger: Logger = new Logger(GlobalGateway.name);

  afterInit(server: Server): void {
    const env = this.configService.getOrThrow<string>('NODE_ENV');

    if (env === 'development') {
      this.logger.log('Development mode');
    }

    this.logger.log('Initialized');
  }

  async handleConnection(client: Socket): Promise<void> {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('ping')
  handleMessage(client: Socket, payload: any): string {
    this.logger.log(`Ping received: ${payload}`);
    return 'pong';
  }
}
