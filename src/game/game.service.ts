import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from '@prisma/client';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    const existingGame = await this.prisma.game.findUnique({
      where: { title: createGameDto.title },
    });
    if (existingGame) {
      throw new ConflictException('Já existe um jogo cadastrado com este título.');
    }

    return this.prisma.game.create({
      data: {
        title: createGameDto.title,
        description: createGameDto.description,
        thumbnail: createGameDto.thumbnail,
      },
    });
  }

  async getGames(includeAll?: boolean): Promise<Game[]> {
    return this.prisma.game.findMany({
      where: includeAll ? {} : { deleted_at: null },
      orderBy: { created_at: 'desc' },
    });
  }

  async getGameById(id: string): Promise<Game> {
    const game = await this.prisma.game.findFirst({
      where: {
        id,
        deleted_at: null,
      },
    });
    if (!game) throw new NotFoundException('Jogo não encontrado');
    return game;
  }

  async updateGame(id: string, updateGameDto: UpdateGameDto): Promise<Game> {
    await this.getGameById(id);
    return this.prisma.game.update({
      where: { id },
      data: {
        ...updateGameDto,
      },
    });
  }

  async deleteGame(id: string): Promise<Game> {
    const game = await this.prisma.game.findUnique({ where: { id } });
    if (!game) throw new NotFoundException('Jogo não encontrado');
    return this.prisma.game.update({
      where: { id },
      data: {
        deleted_at: new Date(),
      },
    });
  }

  async restoreGame(id: string): Promise<Game> {
    return this.prisma.game.update({
      where: { id },
      data: {
        deleted_at: null,
      },
    });
  }

  async hardDeleteGame(id: string): Promise<Game> {
    const game = await this.prisma.game.findUnique({ where: { id } });
    if (!game) throw new NotFoundException('Jogo não encontrado');
    
    // Deleta os históricos do jogo para não violar constraint de Foreign Key
    await this.prisma.gameHistory.deleteMany({
      where: { game_id: id }
    });

    return this.prisma.game.delete({
      where: { id },
    });
  }
}