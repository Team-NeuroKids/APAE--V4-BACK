import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateActionCardDto } from './dto/create-action-card.dto';
import { ActionCard } from '@prisma/client';
import { UpdateActionCardDto } from './dto/update-action-cart.dto';
import { ListCardsRequestDto } from './dto/list-cards-request.dto';
import { PaginatedCardsResponseDto } from './dto/list-cards-response.dto';

@Injectable()
export class ActionCardsService {
  constructor(private prisma: PrismaService) {}

  async createActionCard(
    createActionCardDto: CreateActionCardDto,
  ): Promise<ActionCard> {
    return this.prisma.actionCard.create({
      data: createActionCardDto,
    });
  }

  async getAllCards({
    take,
    cursor,
    search,
    category,
  }: ListCardsRequestDto): Promise<PaginatedCardsResponseDto> {
    const cards = await this.prisma.actionCard.findMany({
      take: take + 1,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        deleted_at: null,
        ...(search
          ? {
              label: { contains: search, mode: 'insensitive' },
            }
          : {}),
        ...(category
          ? {
              category: { equals: category, mode: 'insensitive' },
            }
          : {}),
      },
    });

    const hasNextPage = cards.length > take;
    const data = hasNextPage ? cards.slice(0, take) : cards;
    const nextCursor = hasNextPage ? data[data.length - 1].id : null;

    return {
      data,
      meta: {
        nextCursor,
        hasNextPage,
      },
    };
  }

  async getCardById(id: string): Promise<ActionCard> {
    return this.prisma.actionCard.findUniqueOrThrow({
      where: { id, deleted_at: null },
    });
  }

  async updateCard(
    id: string,
    updateActionCardDto: UpdateActionCardDto,
  ): Promise<ActionCard> {
    return this.prisma.actionCard.update({
      where: { id, deleted_at: null },
      data: updateActionCardDto,
    });
  }

  async deleteCard(id: string): Promise<ActionCard> {
    return this.prisma.actionCard.update({
      where: { id, deleted_at: null },
      data: { deleted_at: new Date() },
    });
  }

  async restoreCard(id: string): Promise<ActionCard> {
    return this.prisma.actionCard.update({
      where: { id, deleted_at: { not: null } },
      data: { deleted_at: null },
    });
  }
}
