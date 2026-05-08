import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserRole } from 'src/common/enums/roles.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameResponseDto } from './dto/game-response.dto';
import { GameService } from './game.service';
import { RolesGuard } from 'src/common/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Roles(UserRole.ADMIN)
  @Post()
  async createGame(
    @Body() createGameDto: CreateGameDto,
  ): Promise<GameResponseDto> {
    const game = await this.gameService.createGame(createGameDto);
    return new GameResponseDto(game);
  }

  @Get()
  async getGames(): Promise<GameResponseDto[]> {
    const games = await this.gameService.getGames();
    return games.map((game) => new GameResponseDto(game));
  }

  @Get(':id')
  async getGameById(@Param('id') id: string): Promise<GameResponseDto> {
    const game = await this.gameService.getGameById(id);
    return new GameResponseDto(game);
  }

  @Roles(UserRole.ADMIN)
  @Put(':id')
  async updateGame(
    @Param('id') id: string,
    @Body() updateGameDto: UpdateGameDto,
  ): Promise<GameResponseDto> {
    const game = await this.gameService.updateGame(id, updateGameDto);
    return new GameResponseDto(game);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async deleteGame(@Param('id') id: string): Promise<GameResponseDto> {
    const game = await this.gameService.deleteGame(id);
    return new GameResponseDto(game);
  }

  @Roles(UserRole.ADMIN)
  @Post(':id/restore')
  async restoreGame(@Param('id') id: string): Promise<GameResponseDto> {
    const game = await this.gameService.restoreGame(id);
    return new GameResponseDto(game);
  }
}
