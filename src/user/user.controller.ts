import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
import { ListUsersRequestDto } from './dto/list-users-request.dto';
import { PaginatedUsersResponseDto } from './dto/list-users-response.dto';
import { UserSwagger } from './user.swagger';

@ApiTags('Usuários')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UserSwagger.createUser()
  @Post()
  async createUser(@Body() input: CreateUserDto): Promise<CreateUserOutput> {
    return await this.userService.createUser(input);
  }

  @UserSwagger.listUsers()
  @Get()
  async listUsers(
    @Query() query: ListUsersRequestDto,
  ): Promise<PaginatedUsersResponseDto> {
    return await this.userService.listUsers(query);
  }

  @UserSwagger.getUser()
  @Get(':id')
  async getUser(@Param() input: GetUserInput): Promise<GetUserOutput> {
    return await this.userService.getUser(input);
  }
}
