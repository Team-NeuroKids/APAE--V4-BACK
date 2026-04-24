import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import type {
  CreateUserOutput,
  GetUserInput,
  GetUserOutput,
} from 'src/user/types';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserRole } from 'src/common/enums/roles.enum';
import { Roles } from 'src/common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() input: CreateUserDto): Promise<CreateUserOutput> {
    return await this.userService.createUser(input);
  }

  @Get()
  async listUsers(): Promise<GetUserOutput[]> {
    return await this.userService.listUsers();
  }

  @Get(':id')
  async getUser(@Param() input: GetUserInput): Promise<GetUserOutput> {
    return await this.userService.getUser(input);
  }
}
