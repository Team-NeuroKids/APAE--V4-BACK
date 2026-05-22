import {
  Logger,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WsAuthGuard } from '../../common/guards/ws-auth.guard';
import { PresenceService } from 'src/presence/presence.service';
import { GameHistoriesService } from 'src/game-histories/game-histories.service';
import {
  CreateGameHistoryDto,
  CreateGameHistoryRequestDto,
} from 'src/game-histories/dto/create-game-history.dto';
import { AllWsExceptionsFilter } from 'src/common/filter/all-ws-exception.filter';
import { AuthService } from 'src/auth/auth.service';
import { GetWsClientData } from 'src/common/decorators/ws-client-data.decorator';
import type { AuthSocket, WsClientData } from '../types';
import {
  CreateActionClickDto,
  CreateActionLogDto,
} from 'src/actions/action-logs/dto/create-action-log.dto';
import { ActionLogsService } from 'src/actions/action-logs/action-logs.service';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:4000',
    credentials: true,
  },
})
@UseFilters(new AllWsExceptionsFilter())
export class GlobalGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(GlobalGateway.name);

  @WebSocketServer()
  server: Server;

  constructor(
    private readonly presenceService: PresenceService,
    private readonly gameHistoriesService: GameHistoriesService,
    private readonly authService: AuthService,
    private readonly actionLogsService: ActionLogsService,
  ) {}

  async handleConnection(client: AuthSocket): Promise<void> {
    try {
      const tokenString =
        (client.handshake.auth?.token as string) ||
        (client.handshake.headers?.authorization?.split(' ')[1] as string);

      const payload = await this.authService.verifyWsToken(tokenString);

      client.data.sessionId = payload.sessionId;
      client.data.childId = payload.childId;

      this.presenceService.addConnection(payload.childId, client.id);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido';

      this.logger.warn(
        `Falha na conexão WebSocket (ID: ${client.id}): ${errorMessage}`,
      );
      client.disconnect(true);
    }
  }

  handleDisconnect(client: AuthSocket): void {
    if (client.data.childId) {
      this.presenceService.removeConnection(client.data.childId, client.id);
    }
  }

  @UseGuards(WsAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @SubscribeMessage('save_score')
  async handleSaveScore(
    @GetWsClientData() { sessionId, childId }: WsClientData,
    @MessageBody() payload: CreateGameHistoryRequestDto,
  ) {
    const createDto: CreateGameHistoryDto = {
      ...payload,
      session_id: sessionId,
      child_id: childId,
    };

    await this.gameHistoriesService.saveScore(createDto);

    return { status: 'success' };
  }

  @UseGuards(WsAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @SubscribeMessage('action_click')
  async handleActionClick(
    @GetWsClientData() { sessionId, childId }: WsClientData,
    @MessageBody() payload: CreateActionClickDto,
  ) {
    const createDto: CreateActionLogDto = {
      action_card_id: payload.action_card_id,
      session_id: sessionId,
      child_id: childId,
    };

    await this.actionLogsService.logAction(createDto);
    return { status: 'success' };
  }
}
