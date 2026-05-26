import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateSessionDto } from './dto/create-session.dto';
import { ListSessionsRequestDto } from './dto/list-sessions-request.dto';
import { PaginatedSessionsResponseDto } from './dto/list-sessions-response.dto';
import { Session } from '@prisma/client';
import { ChildrenService } from 'src/children/children.service';

@Injectable()
export class SessionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly childrenService: ChildrenService,
  ) {}

  async createSession(
    { childId }: CreateSessionDto,
    userId: string,
  ): Promise<{ session: Session; sessionToken: string }> {
    await this.childrenService.validateOwnership(childId, userId);

    const session = await this.prisma.session.create({
      data: {
        child_id: childId,
        opened_by_id: userId,
      },
    });

    const payload = {
      sub: session.id,
      sessionId: session.id,
      childId: childId,
    };

    const sessionToken = await this.jwtService.signAsync(payload, {
      expiresIn: '4h',
    });

    return {
      session,
      sessionToken,
    };
  }

  async getSessionsByChild(
    childId: string,
    userId: string,
    { take, cursor }: ListSessionsRequestDto,
  ): Promise<PaginatedSessionsResponseDto> {
    await this.childrenService.validateOwnership(childId, userId);

    const sessions = await this.prisma.session.findMany({
      take: take + 1,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      where: { child_id: childId },
      include: {
        _count: {
          select: { game_histories: true },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    const hasNextPage = sessions.length > take;
    const data = hasNextPage ? sessions.slice(0, take) : sessions;
    const nextCursor = hasNextPage ? data[data.length - 1].id : null;

    return {
      data,
      meta: {
        nextCursor,
        hasNextPage,
      },
    };
  }

  async getSessionsByUser(
    userId: string,
    { take, cursor }: ListSessionsRequestDto,
  ): Promise<PaginatedSessionsResponseDto> {
    const sessions = await this.prisma.session.findMany({
      take: take + 1,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      where: { opened_by_id: userId },
      include: {
        _count: {
          select: { game_histories: true },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    const hasNextPage = sessions.length > take;
    const data = hasNextPage ? sessions.slice(0, take) : sessions;
    const nextCursor = hasNextPage ? data[data.length - 1].id : null;

    return {
      data,
      meta: {
        nextCursor,
        hasNextPage,
      },
    };
  }

  async getSessionById(id: string, userId: string): Promise<Session> {
    const session = await this.prisma.session.findFirstOrThrow({
      where: {
        id,
        child: { responsible_links: { some: { user_id: userId } } },
      },
      include: {
        _count: {
          select: { game_histories: true },
        },
      },
    });

    return session;
  }
}
