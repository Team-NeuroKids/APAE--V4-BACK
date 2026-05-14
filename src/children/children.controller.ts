import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
import type { AuthUser } from 'src/auth/types';
import { UpdateChildDto } from './dto/update-child.dto';
import { ChildResponseDto } from './dto/child-response.dto';
import { ChildrenService } from './children.service';
import { ListChildsRequestDto } from './dto/list-childs-request.dto';
import { PaginatedChildsResponseDto } from './dto/list-childs-response.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AddResponsibleToChildDto } from './dto/add-responsible-to-child.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Roles(UserRole.DOCTOR)
  @Post()
  async createChild(
    @Body() createChildDto: CreateChildDto,
    @GetUser() user: AuthUser,
  ): Promise<ChildResponseDto> {
    const child = await this.childrenService.createChild(
      createChildDto,
      user.id,
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
    @GetUser() user: AuthUser,
    @Query() query: ListChildsRequestDto,
  ): Promise<PaginatedChildsResponseDto> {
    const { data, meta } = await this.childrenService.getChildrenByUserId(
      user.id,
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
    @GetUser() user: AuthUser,
  ): Promise<ChildResponseDto> {
    const child = await this.childrenService.getChildById(id, user.id);
    return new ChildResponseDto(child);
  }

  @Roles(UserRole.DOCTOR)
  @Put(':id')
  async updateChild(
    @Param('id') id: string,
    @Body() updateChildDto: UpdateChildDto,
    @GetUser() user: AuthUser,
  ): Promise<ChildResponseDto> {
    const child = await this.childrenService.updateChild(
      id,
      updateChildDto,
      user.id,
    );
    return new ChildResponseDto(child);
  }

  @Roles(UserRole.DOCTOR)
  @Delete(':id')
  async deleteChild(
    @Param('id') id: string,
    @GetUser() user: AuthUser,
  ): Promise<ChildResponseDto> {
    const child = await this.childrenService.deleteChild(id, user.id);
    return new ChildResponseDto(child);
  }

  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN)
  @Post(':id/restore')
  async restoreChild(@Param('id') id: string): Promise<ChildResponseDto> {
    const child = await this.childrenService.restoreChild(id);
    return new ChildResponseDto(child);
  }

  @Roles(UserRole.DOCTOR, UserRole.CAREGIVER)
  @Post('/:childId/responsibles')
  async addResponsibleToChild(
    @Param('childId') childId: string,
    @Body() addResponsibleDto: AddResponsibleToChildDto,
    @GetUser() user: AuthUser,
  ): Promise<ChildResponseDto> {
    const child = await this.childrenService.addResponsibleToChild(
      childId,
      addResponsibleDto.responsibleId,
      user.id,
    );

    return new ChildResponseDto(child);
  }

  @Roles(UserRole.DOCTOR, UserRole.CAREGIVER)
  @Delete('/:childId/responsibles/:responsibleId')
  async removeResponsibleFromChild(
    @Param('childId') childId: string,
    @Param('responsibleId') responsibleId: string,
    @GetUser() user: AuthUser,
  ): Promise<ChildResponseDto> {
    const child = await this.childrenService.removeResponsibleFromChild(
      childId,
      responsibleId,
      user.id,
    );

    return new ChildResponseDto(child);
  }
}
