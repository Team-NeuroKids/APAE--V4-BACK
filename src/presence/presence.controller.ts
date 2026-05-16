import { Controller, Get, UseGuards } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('presence')
export class PresenceController {
  constructor(private readonly presenceService: PresenceService) {}

  @UseGuards(JwtAuthGuard)
  @Get('online')
  getOnlineUsers(): { onlineUsers: string[] } {
    return {
      onlineUsers: this.presenceService.getOnlineUsers(),
    };
  }
}
