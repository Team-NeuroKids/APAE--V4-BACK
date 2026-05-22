import { ApiProperty } from '@nestjs/swagger';
import { ActionLog } from '@prisma/client';
import { PaginationMetaDto } from 'src/common/dtos/pagination-meta.dto';

export class PaginatedActionLogsResponseDto {
  @ApiProperty({
    description: 'Lista de logs de ação',
    isArray: true,
    example: [
      {
        id: 'cuid1234567890',
        session_id: 'cuid1234567890',
        child_id: 'cuid1234567890',
        action_card_id: 'cuid1234567890',
        click_count: 5,
        recorded_minute: '2023-10-01T12:00:00Z',
        created_at: '2023-10-01T12:00:00Z',
        updated_at: '2023-10-01T12:00:00Z',
      },
    ],
  })
  data: ActionLog[];

  @ApiProperty({
    description: 'Metadados de paginação',
    type: PaginationMetaDto,
  })
  meta: PaginationMetaDto;
}
