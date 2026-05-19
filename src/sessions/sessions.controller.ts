import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SessionsService } from './sessions.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import type { AuthUser } from 'src/auth/types';
import { ListSessionsRequestDto } from './dto/list-sessions-request.dto';
import { CreateSessionDto } from './dto/create-session.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/roles.enum';
import { Session } from '@prisma/client';
import { PaginatedSessionsResponseDto } from './dto/list-sessions-response.dto';
import { SessionsSwagger } from './sessions.swagger';

@ApiTags('Sessões')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.CAREGIVER, UserRole.DOCTOR)
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @SessionsSwagger.createSession()
  @Post()
  async createSession(
    @GetUser() user: AuthUser,
    @Body() body: CreateSessionDto,
  ): Promise<{
    session: Session;
    sessionToken: string;
  }> {
    return await this.sessionsService.createSession(body, user.id);
  }

  @SessionsSwagger.getSessionsByUserMe()
  @Get('me')
  async getSessionsByUserMe(
    @GetUser() user: AuthUser,
    @Query() query: ListSessionsRequestDto,
  ): Promise<PaginatedSessionsResponseDto> {
    return this.sessionsService.getSessionsByUser(user.id, query);
  }

  @SessionsSwagger.getSessionsByChild()
  @Get('child/:childId')
  async getSessionsByChild(
    @Param('childId') childId: string,
    @Query() query: ListSessionsRequestDto,
    @GetUser() user: AuthUser,
  ): Promise<PaginatedSessionsResponseDto> {
    return this.sessionsService.getSessionsByChild(childId, user.id, query);
  }

  @SessionsSwagger.getSessionById()
  @Get(':id')
  async getSessionById(
    @Param('id') id: string,
    @GetUser() user: AuthUser,
  ): Promise<Session> {
    return this.sessionsService.getSessionById(id, user.id);
  }
}
