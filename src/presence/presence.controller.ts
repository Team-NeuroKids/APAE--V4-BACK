import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PresenceService } from './presence.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PresenceSwagger } from './presence.swagger';

@ApiTags('Presença')
@ApiBearerAuth()
@Controller('presence')
export class PresenceController {
  constructor(private readonly presenceService: PresenceService) {}

  @PresenceSwagger.getOnlineUsers()
  @UseGuards(JwtAuthGuard)
  @Get('online')
  getOnlineUsers(): { onlineUsers: string[] } {
    return {
      onlineUsers: this.presenceService.getOnlineUsers(),
    };
  }
}
