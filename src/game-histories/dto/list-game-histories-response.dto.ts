import { ApiProperty } from '@nestjs/swagger';
import { GameHistory } from '@prisma/client';
import { PaginationMetaDto } from 'src/common/dtos/pagination-meta.dto';

export class GameHistoryResponseDto {
  @ApiProperty({ example: 'cuid1234567890' })
  id: string;

  @ApiProperty({ example: 'cuid1234567890' })
  session_id: string;

  @ApiProperty({ example: 'cuid1234567890' })
  child_id: string;

  @ApiProperty({ example: 'cuid1234567890' })
  game_id: string;

  @ApiProperty({ example: 100 })
  score: number;

  @ApiProperty({ example: 10 })
  correct_answers: number;

  @ApiProperty({ example: 2 })
  wrong_answers: number;

  @ApiProperty({ example: 60, required: false })
  time_spent?: number;

  @ApiProperty({ example: 'Muito bem!', required: false })
  observations?: string;

  @ApiProperty({ example: '2023-10-01T12:00:00Z' })
  created_at: Date;

  @ApiProperty({
    example: {
      id: 'cuid1234567890',
      title: 'Labirinto',
      thumbnail: 'https://example.com/thumb.png',
      created_at: '2023-10-01T12:00:00Z',
      updated_at: '2023-10-01T12:00:00Z',
    },
    required: false
  })
  game?: any;
}

export class PaginatedGameHistoriesResponseDto {
  @ApiProperty({
    description: 'Lista de histórico de jogos',
    type: [GameHistoryResponseDto],
  })
  data: GameHistoryResponseDto[];

  @ApiProperty({
    description: 'Metadados de paginação',
    type: PaginationMetaDto,
  })
  meta: PaginationMetaDto;
}
