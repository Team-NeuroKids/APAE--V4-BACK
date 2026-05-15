import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SessionsService } from 'src/sessions/sessions.service';
import { JwtService } from '@nestjs/jwt';

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
    private sessionsService: SessionsService,
    private jwtService: JwtService,
  ) { }

  private logger: Logger = new Logger(GlobalGateway.name);

  afterInit(server: Server) {
    const env = this.configService.getOrThrow<string>('NODE_ENV');

    if (env === 'development') {
      this.logger.log('Development mode');
    }

    this.logger.log('Initialized');
  }

  async handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    try {
      const token = client.handshake.auth.token || client.handshake.headers.authorization?.split(' ')[1];
      if (token) {
        const payload = await this.jwtService.verifyAsync(token);
        if (payload && payload.sub) {
          client.data.userId = payload.sub;
          this.sessionsService.addSession(payload.sub, client.id);
        }
      }
    } catch (error) {
      this.logger.warn(`Invalid token for client ${client.id}`);
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    if (client.data.userId) {
      this.sessionsService.removeSession(client.data.userId, client.id);
    }
  }

  @SubscribeMessage('ping')
  handleMessage(client: Socket, payload: any): string {
    this.logger.log(`Ping received: ${payload}`);
    return 'pong';
  }
}
