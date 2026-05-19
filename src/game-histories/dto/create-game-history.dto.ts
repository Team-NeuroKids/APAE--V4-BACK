import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

export class CreateGameHistoryDto {
  @IsNotEmpty()
  @IsString()
  session_id: string;

  @IsNotEmpty()
  @IsString()
  child_id: string;

  @IsNotEmpty()
  @IsString()
  game_id: string;

  @IsNotEmpty()
  @IsNumber()
  score: number;

  @IsNotEmpty()
  @IsNumber()
  correct_answers: number;

  @IsNotEmpty()
  @IsNumber()
  wrong_answers: number;

  @IsOptional()
  @IsNumber()
  time_spent: number;

  @IsOptional()
  @IsString()
  observations: string;
}

export class CreateGameHistoryRequestDto extends OmitType(
  CreateGameHistoryDto,
  ['session_id', 'child_id'] as const,
) {}
