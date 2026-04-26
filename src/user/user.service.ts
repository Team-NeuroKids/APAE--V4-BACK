import { Injectable, NotFoundException } from '@nestjs/common';
import { hash_password } from 'src/common/utils';
import { PrismaService } from 'src/prisma.service';
import { CreateUserOutput, GetUserInput, GetUserOutput } from 'src/user/types';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

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
      password: await hash_password(password),
      role,
    };

    const user = await this.prisma.user.create({ data });
    return { id: user.id };
  }

  async listUsers(): Promise<GetUserOutput[]> {
    return await this.prisma.user.findMany();
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
