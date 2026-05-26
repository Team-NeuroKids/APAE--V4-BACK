import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from '@prisma/client';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    return this.prisma.game.create({
      data: {
        title: createGameDto.title,
        description: createGameDto.description,
        thumbnail: createGameDto.thumbnail,
      },
    });
  }

  async getGames(): Promise<Game[]> {
    return this.prisma.game.findMany({
      where: {
        deleted_at: null,
      },
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
    await this.getGameById(id);
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
}
