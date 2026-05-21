import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateChildDto } from './dto/create-child.dto';
import { Child, Prisma } from '@prisma/client';
import { UpdateChildDto } from './dto/update-child.dto';
import { ListChildsRequestDto } from './dto/list-childs-request.dto';
import { PaginatedChildsResponseDto } from './dto/list-childs-response.dto';
import { UserRole } from 'src/common/enums/roles.enum';

@Injectable()
export class ChildrenService {
  constructor(private prisma: PrismaService) {}

  async createChild(
    createChildDto: CreateChildDto,
    userId: string,
  ): Promise<Child> {
    return this.prisma.child.create({
      data: {
        ...createChildDto,
        responsible_links: {
          create: {
            user_id: userId,
          },
        },
      },
    });
  }

  async getChildren({
    take,
    cursor,
    search,
  }: ListChildsRequestDto): Promise<PaginatedChildsResponseDto> {
    const children = await this.prisma.child.findMany({
      take: take + 1,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        deleted_at: null,
        ...(search
          ? {
              OR: [
                {
                  name: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
                {
                  cpf: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              ],
            }
          : {}),
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

  async getChildrenByUserId(
    userId: string,
    { take, cursor, search }: ListChildsRequestDto,
  ): Promise<PaginatedChildsResponseDto> {
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
        ...(search
          ? {
              OR: [
                {
                  name: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
                {
                  cpf: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              ],
            }
          : {}),
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

  async addResponsibleToChild(
    childId: string,
    responsibleId: string,
    userId: string,
  ): Promise<Child> {
    await this.validateOwnership(childId, userId);

    await this.prisma.user.findUniqueOrThrow({
      where: { id: responsibleId },
    });

    return await this.prisma.child.update({
      where: { id: childId },
      data: {
        responsible_links: {
          create: {
            user_id: responsibleId,
          },
        },
      },
    });
  }

  async removeResponsibleFromChild(
    childId: string,
    responsibleId: string,
    userId: string,
  ): Promise<Child> {
    await this.validateOwnership(childId, userId);

    return this.prisma.$transaction(async (tx) => {
      const link = await tx.userChild.findUnique({
        where: {
          user_id_child_id: { user_id: responsibleId, child_id: childId },
        },
        include: { user: { select: { role: true } } },
      });

      if (!link) {
        throw new NotFoundException(
          'Este responsável já não está vinculado a esta criança.',
        );
      }

      await this.ensureMinimumResponsibles(
        childId,
        link.user.role as UserRole,
        tx,
      );

      return tx.child.update({
        where: { id: childId },
        data: {
          responsible_links: {
            delete: {
              user_id_child_id: { user_id: responsibleId, child_id: childId },
            },
          },
        },
      });
    });
  }

  private async ensureMinimumResponsibles(
    childId: string,
    role: UserRole,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const prismaClient = tx ?? this.prisma;
    const roleCount = await prismaClient.userChild.count({
      where: { child_id: childId, user: { role } },
    });

    if (roleCount <= 1) {
      const roleName = role === UserRole.DOCTOR ? 'Médico' : 'Cuidador';
      throw new BadRequestException(
        `Ação bloqueada. A criança deve ter pelo menos um ${roleName} vinculado.`,
      );
    }
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
