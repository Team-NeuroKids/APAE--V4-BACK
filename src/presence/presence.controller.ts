import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PresenceService } from './presence.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PresenceSwagger } from './presence.swagger';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import type { AuthUser } from 'src/auth/types';

@ApiTags('Presença')
@ApiBearerAuth()
@Controller('presence')
export class PresenceController {
  constructor(private readonly presenceService: PresenceService) {}

  @PresenceSwagger.getOnlineUsers()
  @UseGuards(JwtAuthGuard)
  @Get('online')
  getOnlineUsers(@GetUser() user: AuthUser): { onlineUsers: string[] } {
    // Ao chamar essa rota, atualizamos o status do usuário como online
    if (user && user.id) {
      this.presenceService.updateHeartbeat(user.id);
    }
    
    return {
      onlineUsers: this.presenceService.getOnlineUsers(),
    };
  }
}
