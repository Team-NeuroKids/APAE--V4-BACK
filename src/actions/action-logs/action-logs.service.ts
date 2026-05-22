import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateActionLogDto } from './dto/create-action-log.dto';
import { ActionLog } from '@prisma/client';
import { ListActionLogsRequestDto } from './dto/list-action-logs-request.dto';
import { PaginatedActionLogsResponseDto } from './dto/list-action-logs-response.dto';
import { ChildrenService } from 'src/children/children.service';

@Injectable()
export class ActionLogsService {
  constructor(
    private prisma: PrismaService,
    private childService: ChildrenService,
  ) {}
  private readonly logger = new Logger(ActionLogsService.name);

  async logAction(data: CreateActionLogDto): Promise<ActionLog> {
    const minuteStart = new Date();
    minuteStart.setSeconds(0, 0);
    const actionLog = await this.prisma.actionLog.upsert({
      where: {
        unique_log_minute: {
          session_id: data.session_id,
          child_id: data.child_id,
          action_card_id: data.action_card_id,
          recorded_minute: minuteStart,
        },
      },
      update: {
        click_count: { increment: 1 },
      },
      create: {
        session_id: data.session_id,
        child_id: data.child_id,
        action_card_id: data.action_card_id,
        recorded_minute: minuteStart,
      },
    });
    this.logger.log(
      `Action logged | Child: ${actionLog.child_id} | Session: ${actionLog.session_id} | Card: ${actionLog.action_card_id}`,
    );

    return actionLog;
  }

  async getActionLogsBySession(
    sessionId: string,
    userId: string,
    { take, cursor }: ListActionLogsRequestDto,
  ): Promise<PaginatedActionLogsResponseDto> {
    const session = await this.prisma.session.findUniqueOrThrow({
      where: { id: sessionId },
      select: { child_id: true },
    });
    await this.childService.validateOwnership(session.child_id, userId);

    const logs = await this.prisma.actionLog.findMany({
      take: take + 1,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      where: { session_id: sessionId },
      include: { action_card: true },
      orderBy: { created_at: 'desc' },
    });

    const hasNextPage = logs.length > take;
    const data = hasNextPage ? logs.slice(0, take) : logs;
    const nextCursor = hasNextPage ? data[data.length - 1].id : null;

    return { data, meta: { nextCursor, hasNextPage } };
  }

  async getActionLogsByChild(
    childId: string,
    userId: string,
    { take, cursor, sessionId }: ListActionLogsRequestDto,
  ): Promise<PaginatedActionLogsResponseDto> {
    await this.childService.validateOwnership(childId, userId);

    const logs = await this.prisma.actionLog.findMany({
      take: take + 1,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        child_id: childId,
        ...(sessionId && { session_id: sessionId }),
      },
      include: { action_card: true },
      orderBy: { created_at: 'desc' },
    });

    const hasNextPage = logs.length > take;
    const data = hasNextPage ? logs.slice(0, take) : logs;
    const nextCursor = hasNextPage ? data[data.length - 1].id : null;

    return { data, meta: { nextCursor, hasNextPage } };
  }
}
