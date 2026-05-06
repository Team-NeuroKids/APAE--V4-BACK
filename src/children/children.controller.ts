import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserRole } from 'src/common/enums/roles.enum';
import { CreateChildDto } from './dto/create-child.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import type { JwtPayload } from 'src/auth/types';
import { UpdateChildDto } from './dto/update-child.dto';
import { ChildResponseDto } from './dto/child-response.dto';
import { ChildrenService } from './children.service';
import { ListChildsRequestDto } from './dto/list-childs-request.dto';
import { PaginatedChildsResponseDto } from './dto/list-childs-response.dto';

@UseGuards(JwtAuthGuard)
@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Roles(UserRole.DOCTOR)
  @Post()
  async createChild(
    @Body() createChildDto: CreateChildDto,
    @GetUser() user: JwtPayload,
  ): Promise<ChildResponseDto> {
    const child = await this.childrenService.createChild(
      createChildDto,
      user.sub,
    );
    return new ChildResponseDto(child);
  }

  @Roles(UserRole.ADMIN)
  @Get()
  async getChildren(
    @Query() query: ListChildsRequestDto,
  ): Promise<PaginatedChildsResponseDto> {
    const { data, meta } = await this.childrenService.getChildren(query);
    return {
      data: data.map((child) => new ChildResponseDto(child)),
      meta,
    };
  }

  @Roles(UserRole.DOCTOR, UserRole.CAREGIVER)
  @Get('/me')
  async getChildrenByUser(
    @GetUser() user: JwtPayload,
    @Query() query: ListChildsRequestDto,
  ): Promise<PaginatedChildsResponseDto> {
    const { data, meta } = await this.childrenService.getChildrenByUserId(
      user.sub,
      query,
    );
    return {
      data: data.map((child) => new ChildResponseDto(child)),
      meta,
    };
  }

  @Roles(UserRole.DOCTOR, UserRole.CAREGIVER)
  @Get(':id')
  async getChildById(
    @Param('id') id: string,
    @GetUser() user: JwtPayload,
  ): Promise<ChildResponseDto> {
    const child = await this.childrenService.getChildById(id, user.sub);
    return new ChildResponseDto(child);
  }

  @Roles(UserRole.DOCTOR)
  @Put(':id')
  async updateChild(
    @Param('id') id: string,
    @Body() updateChildDto: UpdateChildDto,
    @GetUser() user: JwtPayload,
  ): Promise<ChildResponseDto> {
    const child = await this.childrenService.updateChild(
      id,
      updateChildDto,
      user.sub,
    );
    return new ChildResponseDto(child);
  }

  @Roles(UserRole.DOCTOR)
  @Delete(':id')
  async deleteChild(
    @Param('id') id: string,
    @GetUser() user: JwtPayload,
  ): Promise<ChildResponseDto> {
    const child = await this.childrenService.deleteChild(id, user.sub);
    return new ChildResponseDto(child);
  }

  @Roles(UserRole.ADMIN)
  @Post(':id/restore')
  async restoreChild(@Param('id') id: string): Promise<ChildResponseDto> {
    const child = await this.childrenService.restoreChild(id);
    return new ChildResponseDto(child);
  }
}
