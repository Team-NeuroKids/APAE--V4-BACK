import { ApiProperty } from '@nestjs/swagger';
import { GameHistory } from '@prisma/client';
import { PaginationMetaDto } from 'src/common/dtos/pagination-meta.dto';

export class PaginatedGameHistoriesResponseDto {
  @ApiProperty({
    description: 'Lista de histórico de jogos',
    isArray: true,
    example: [
      {
        id: 'cuid1234567890',
        sessionId: 'cuid1234567890',
        gameId: 'cuid1234567890',
        userId: 'cuid1234567890',
        score: 100,
        time_spent: 60,
        created_at: '2023-10-01T12:00:00Z',
        updated_at: '2023-10-01T12:00:00Z',
        deleted_at: null,
      },
    ],
  })
  data: GameHistory[];

  @ApiProperty({
    description: 'Metadados de paginação',
    type: PaginationMetaDto,
  })
  meta: PaginationMetaDto;
}
