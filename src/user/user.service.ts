import { Injectable, NotFoundException } from '@nestjs/common';
import { UtilsService } from 'src/common/utils.service';
import { PrismaService } from 'src/prisma.service';
import { CreateUserOutput, GetUserInput, GetUserOutput } from 'src/user/types';
import { CreateUserDto } from './dto/user.dto';
import { ListUsersRequestDto } from './dto/list-users-request.dto';
import { PaginatedUsersResponseDto } from './dto/list-users-response.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utils: UtilsService,
  ) {}

  async createUser({
    name,
    email,
    cpf,
    password,
    role,
  }: CreateUserDto): Promise<CreateUserOutput> {
    const data = {
      name,
      email,
      cpf,
      password: await this.utils.hash_password(password),
      role,
    };

    const user = await this.prisma.user.create({ data });
    return { id: user.id };
  }

  async listUsers({
    take,
    cursor,
    search,
  }: ListUsersRequestDto): Promise<PaginatedUsersResponseDto> {
    const users = await this.prisma.user.findMany({
      take: take + 1,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        deleted_at: null,
        ...(search
          ? {
              OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { cpf: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
    });

    const hasNextPage = users.length > take;
    const data = hasNextPage ? users.slice(0, take) : users;
    const nextCursor = hasNextPage ? data[data.length - 1].id : null;

    return {
      data: data.map(({ password, ...user }) => user as GetUserOutput),
      meta: {
        nextCursor,
        hasNextPage,
      },
    };
  }

  async getUser({ id }: GetUserInput): Promise<GetUserOutput> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const { password, ...result } = user;
    return result as GetUserOutput;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: { email },
    });
  }
}
