import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ActionLogsService } from './action-logs.service';
import { CreateActionLogDto } from './dto/create-action-log.dto';
import { ActionLog } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import type { JwtPayload } from 'src/auth/types';

@UseGuards(JwtAuthGuard)
@Controller('action-logs')
export class ActionLogsController {
  constructor(private readonly actionLogsService: ActionLogsService) {}

  @Post('click')
  async logAction(
    @Body() createActionLogDto: CreateActionLogDto,
    @GetUser() user: JwtPayload,
  ): Promise<ActionLog> {
    return await this.actionLogsService.logAction(createActionLogDto, user.sub);
  }
}
