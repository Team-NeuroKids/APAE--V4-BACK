import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActionLogsService } from './action-logs.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import type { JwtPayload } from 'src/auth/types';
import { ListActionLogsRequestDto } from './dto/list-action-logs-request.dto';
import { PaginatedActionLogsResponseDto } from './dto/list-action-logs-response.dto';
import { ActionLogsSwagger } from './action-logs.swagger';

@ApiTags('Action Logs (Tracking)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('action-logs')
export class ActionLogsController {
  constructor(private readonly actionLogsService: ActionLogsService) {}

  @ActionLogsSwagger.getActionLogsBySession()
  @Get('session/:sessionId')
  async getActionLogsBySession(
    @Param('sessionId') sessionId: string,
    @Query() query: ListActionLogsRequestDto,
    @GetUser() user: JwtPayload,
  ): Promise<PaginatedActionLogsResponseDto> {
    return this.actionLogsService.getActionLogsBySession(
      sessionId,
      user.sub,
      query,
    );
  }

  @ActionLogsSwagger.getActionLogsByChild()
  @Get('child/:childId')
  async getActionLogsByChild(
    @Param('childId') childId: string,
    @Query() query: ListActionLogsRequestDto,
    @GetUser() user: JwtPayload,
  ): Promise<PaginatedActionLogsResponseDto> {
    return this.actionLogsService.getActionLogsByChild(
      childId,
      user.sub,
      query,
    );
  }
}
