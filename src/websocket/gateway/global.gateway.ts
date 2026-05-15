import { Logger, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PresenceService } from 'src/presence/presence.service';
import { JwtService } from '@nestjs/jwt';
import { WsAuthGuard } from '../guards/ws-auth.guard';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:4000',
    credentials: true,
  },
})
export class GlobalGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private configService: ConfigService,
    private presenceService: PresenceService,
    private jwtService: JwtService,
  ) { }

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
    try {
      const token = client.handshake.auth.token || client.handshake.headers.authorization?.split(' ')[1];
      if (!token) {
        this.logger.warn(`No token provided by client ${client.id}. Disconnecting...`);
        client.disconnect(true);
        return;
      }

      const payload = await this.jwtService.verifyAsync(token);
      if (payload && payload.sub) {
        client.data.userId = payload.sub;
        this.presenceService.addConnection(payload.sub, client.id);
      } else {
        client.disconnect(true);
      }
    } catch (error) {
      this.logger.warn(`Invalid token for client ${client.id}. Disconnecting...`);
      client.disconnect(true);
    }
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
    if (client.data.userId) {
      this.presenceService.removeConnection(client.data.userId, client.id);
    }
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('ping')
  handleMessage(client: Socket, payload: any): string {
    this.logger.log(`Ping received: ${payload}`);
    return 'pong';
  }
}
