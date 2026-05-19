import { Controller, Get, Param, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GameHistoriesService } from './game-histories.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ListGameHistoriesRequestDto } from './dto/list-game-histories-request.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { UserRole } from 'src/common/enums/roles.enum';
import type { AuthUser } from 'src/auth/types';
import { PaginatedGameHistoriesResponseDto } from './dto/list-game-histories-response.dto';
import { GameHistoriesSwagger } from './game-histories.swagger';

@ApiTags('Histórico de Jogos')
@ApiBearerAuth()
@Controller('game-histories')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.DOCTOR, UserRole.CAREGIVER)
export class GameHistoriesController {
  constructor(private readonly gameHistoriesService: GameHistoriesService) {}

  @GameHistoriesSwagger.getGameHistoriesByChild()
  @Get('child/:childId')
  async getGameHistoriesByChild(
    @Param('childId') childId: string,
    @Query() query: ListGameHistoriesRequestDto,
    @GetUser() user: AuthUser,
  ): Promise<PaginatedGameHistoriesResponseDto> {
    return this.gameHistoriesService.getGameHistoriesByChild(
      childId,
      user.id,
      query,
    );
  }

  @GameHistoriesSwagger.getGameHistoriesBySession()
  @Get('session/:sessionId')
  async getGameHistoriesBySession(
    @Param('sessionId') sessionId: string,
    @Query() query: ListGameHistoriesRequestDto,
    @GetUser() user: AuthUser,
  ): Promise<PaginatedGameHistoriesResponseDto> {
    return this.gameHistoriesService.getGameHistoriesBySession(
      sessionId,
      user.id,
      query,
    );
  }
}
