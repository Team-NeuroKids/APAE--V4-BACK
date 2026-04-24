import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateChildDto } from './dto/create-child.dto';
import { Child } from '@prisma/client';
import { UpdateChildDto } from './dto/update-child.dto';

@Injectable()
export class ChildrenService {
  constructor(private prisma: PrismaService) {}

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

  async getChildren(): Promise<Child[]> {
    return this.prisma.child.findMany({
      where: {
        deleted_at: null,
      },
      include: {
        responsible_links: true,
      },
    });
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
      throw new NotFoundException('Patient not found or access denied');
    return child;
  }

  async getChildrenByUserId(userId: string): Promise<Child[]> {
    return this.prisma.child.findMany({
      where: {
        responsible_links: {
          some: {
            user_id: userId,
          },
        },
      },
    });
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

    if (!child) throw new NotFoundException('Child not found');

    if (child.responsible_links.length === 0) {
      throw new ForbiddenException(
        'Access denied: You are not assigned to this child',
      );
    }
  }
}
