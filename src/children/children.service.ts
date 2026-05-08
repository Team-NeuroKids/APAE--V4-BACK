import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateChildDto } from './dto/create-child.dto';
import { Child } from '@prisma/client';
import { UpdateChildDto } from './dto/update-child.dto';
import { ListChildsRequestDto } from './dto/list-childs-request.dto';
import { PaginatedChildsResponseDto } from './dto/list-childs-response.dto';

@Injectable()
export class ChildrenService {
  constructor(private prisma: PrismaService) { }

  async createChild(
    createChildDto: CreateChildDto,
    userId: string,
  ): Promise<Child> {
    return this.prisma.child.create({
      data: {
        name: createChildDto.name,
        birth_date: createChildDto.birthDate,
        diagnosis: createChildDto.diagnosis,
        avatar_url: createChildDto.avatarUrl,
        responsible_links: {
          create: {
            user_id: userId,
          },
        },
      },
    });
  }

  async getChildren({ take, cursor, search }: ListChildsRequestDto): Promise<PaginatedChildsResponseDto> {
    const children = await this.prisma.child.findMany({
      take: take + 1,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        deleted_at: null,
        ...(search ? {
          name: {
            contains: search,
            mode: 'insensitive',
          }
        } : {}),
      },
      include: {
        responsible_links: true,
      },
    });

    const hasNextPage = children.length > take;
    const data = hasNextPage ? children.slice(0, take) : children;
    const nextCursor = hasNextPage ? data[data.length - 1].id : null;

    return {
      data,
      meta: {
        nextCursor,
        hasNextPage,
      },
    };
  }

  async getChildById(id: string, userId: string): Promise<Child> {
    const child = await this.prisma.child.findFirst({
      where: {
        id,
        deleted_at: null,
        responsible_links: { some: { user_id: userId } },
      },
    });

    if (!child)
      throw new NotFoundException('Paciente não encontrado ou acesso negado');
    return child;
  }

  async getChildrenByUserId(userId: string, { take, cursor, search }: ListChildsRequestDto): Promise<PaginatedChildsResponseDto> {
    const children = await this.prisma.child.findMany({
      take: take + 1,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        deleted_at: null,
        responsible_links: {
          some: {
            user_id: userId,
          },
        },
        ...(search ? {
          name: {
            contains: search,
            mode: 'insensitive',
          }
        } : {}),
      },
      include: {
        responsible_links: true,
      },
    });

    const hasNextPage = children.length > take;
    const data = hasNextPage ? children.slice(0, take) : children;
    const nextCursor = hasNextPage ? data[data.length - 1].id : null;

    return {
      data,
      meta: {
        nextCursor,
        hasNextPage,
      },
    };
  }

  async updateChild(
    id: string,
    updateChildDto: UpdateChildDto,
    userId: string,
  ): Promise<Child> {
    await this.validateOwnership(id, userId);

    return this.prisma.child.update({
      where: { id },
      data: {
        ...updateChildDto,
      },
    });
  }

  async deleteChild(id: string, userId: string): Promise<Child> {
    await this.validateOwnership(id, userId);

    return this.prisma.child.update({
      where: { id },
      data: {
        deleted_at: new Date(),
      },
    });
  }

  async restoreChild(id: string): Promise<Child> {
    return this.prisma.child.update({
      where: { id },
      data: {
        deleted_at: null,
      },
    });
  }

  async validateOwnership(childId: string, userId: string) {
    const child = await this.prisma.child.findUnique({
      where: { id: childId },
      select: { id: true, responsible_links: { where: { user_id: userId } } },
    });

    if (!child) throw new NotFoundException('Criança não encontrada');

    if (child.responsible_links.length === 0) {
      throw new ForbiddenException(
        'Acesso negado: Você não está atribuído a esta criança',
      );
    }
  }
}
