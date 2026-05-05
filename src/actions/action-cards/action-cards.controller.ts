import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { ActionCardsService } from './action-cards.service';
import { CreateActionCardDto } from './dto/create-action-card.dto';
import { UpdateActionCardDto } from './dto/update-action-cart.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { ClassSerializerInterceptor } from '@nestjs/common';
import { CardResponseDto } from './dto/card-response.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/roles.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('action-cards')
@UseInterceptors(ClassSerializerInterceptor)
export class ActionCardsController {
  constructor(private readonly actionCardsService: ActionCardsService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  async createActionCard(
    @Body() createActionCardDto: CreateActionCardDto,
  ): Promise<CardResponseDto> {
    const card =
      await this.actionCardsService.createActionCard(createActionCardDto);
    return new CardResponseDto(card);
  }

  @Get()
  async getAllCards(): Promise<CardResponseDto[]> {
    const cards = await this.actionCardsService.getAllCards();
    return cards.map((card) => new CardResponseDto(card));
  }

  @Get(':id')
  async getCardById(@Param('id') id: string): Promise<CardResponseDto> {
    const card = await this.actionCardsService.getCardById(id);
    return new CardResponseDto(card);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  async updateCard(
    @Param('id') id: string,
    @Body() updateActionCardDto: UpdateActionCardDto,
  ): Promise<CardResponseDto> {
    const card = await this.actionCardsService.updateCard(
      id,
      updateActionCardDto,
    );
    return new CardResponseDto(card);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async deleteCard(@Param('id') id: string): Promise<CardResponseDto> {
    const card = await this.actionCardsService.deleteCard(id);
    return new CardResponseDto(card);
  }

  @Put(':id/restore')
  @Roles(UserRole.ADMIN)
  async restoreCard(@Param('id') id: string): Promise<CardResponseDto> {
    const card = await this.actionCardsService.restoreCard(id);
    return new CardResponseDto(card);
  }
}
