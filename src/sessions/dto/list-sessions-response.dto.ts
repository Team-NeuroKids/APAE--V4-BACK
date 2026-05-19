import { ApiProperty } from '@nestjs/swagger';
import { Session } from '@prisma/client';
import { PaginationMetaDto } from 'src/common/dtos/pagination-meta.dto';

export class PaginatedSessionsResponseDto {
  @ApiProperty({
    description: 'Lista de sessões',
    isArray: true,
    example: [
      {
        id: 'cuid1234567890',
        childId: 'cuid1234567890',
        gameId: 'cuid1234567890',
        userId: 'cuid1234567890',
        created_at: '2023-10-01T12:00:00Z',
        updated_at: '2023-10-01T12:00:00Z',
        deleted_at: null,
      },
    ],
  })
  data: Session[];

  @ApiProperty({
    description: 'Metadados de paginação',
    type: PaginationMetaDto,
  })
  meta: PaginationMetaDto;
}
