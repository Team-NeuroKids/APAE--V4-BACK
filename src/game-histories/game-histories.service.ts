import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import type { CreateGameHistoryDto } from './dto/create-game-history.dto';
import { ListGameHistoriesRequestDto } from './dto/list-game-histories-request.dto';
import { ChildrenService } from 'src/children/children.service';
import { PaginatedGameHistoriesResponseDto } from './dto/list-game-histories-response.dto';
import { GameHistory } from '@prisma/client';

@Injectable()
export class GameHistoriesService {
  private readonly logger = new Logger(GameHistoriesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly childService: ChildrenService,
  ) {}

  async saveScore(
    createGameHistoryDto: CreateGameHistoryDto,
  ): Promise<GameHistory> {
    const history = await this.prisma.gameHistory.create({
      data: {
        ...createGameHistoryDto,
      },
    });

    this.logger.log(
      `Score saved | Child: ${history.child_id} | Session: ${history.session_id} | Score: ${history.score}`,
    );

    return history;
  }

  async getGameHistoriesByChild(
    childId: string,
    userId: string,
    { take, cursor }: ListGameHistoriesRequestDto,
  ): Promise<PaginatedGameHistoriesResponseDto> {
    await this.childService.validateOwnership(childId, userId);

    const histories = await this.prisma.gameHistory.findMany({
      take: take + 1,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      where: { child_id: childId },
      include: { game: true },
      orderBy: { created_at: 'desc' },
    });

    const hasNextPage = histories.length > take;
    const data = hasNextPage ? histories.slice(0, take) : histories;
    const nextCursor = hasNextPage ? data[data.length - 1].id : null;

    return { data, meta: { nextCursor, hasNextPage } };
  }

  async getGameHistoriesBySession(
    sessionId: string,
    userId: string,
    { take, cursor }: ListGameHistoriesRequestDto,
  ): Promise<PaginatedGameHistoriesResponseDto> {
    const session = await this.prisma.session.findUniqueOrThrow({
      where: { id: sessionId },
      select: { child_id: true },
    });
    await this.childService.validateOwnership(session.child_id, userId);

    const histories = await this.prisma.gameHistory.findMany({
      take: take + 1,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      where: { session_id: sessionId },
      include: { game: true },
      orderBy: { created_at: 'desc' },
    });

    const hasNextPage = histories.length > take;
    const data = hasNextPage ? histories.slice(0, take) : histories;
    const nextCursor = hasNextPage ? data[data.length - 1].id : null;

    return { data, meta: { nextCursor, hasNextPage } };
  }
}
