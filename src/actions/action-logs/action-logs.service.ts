import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateActionLogDto } from './dto/create-action-log.dto';
import { ActionLog } from '@prisma/client';
import { ChildrenService } from 'src/children/children.service';

@Injectable()
export class ActionLogsService {
  constructor(
    private prisma: PrismaService,
    private childrenService: ChildrenService,
  ) {}

  async logAction(
    data: CreateActionLogDto,
    userId: string,
  ): Promise<ActionLog> {
    const minuteStart = new Date();
    minuteStart.setSeconds(0, 0);

    await this.childrenService.validateOwnership(data.child_id, userId);

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

    return actionLog;
  }
}
