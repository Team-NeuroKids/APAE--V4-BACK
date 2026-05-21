import { PaginationMetaDto } from 'src/common/dtos/pagination-meta.dto';
import { GetUserOutput } from '../types';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedUsersResponseDto {
  @ApiProperty({
    description: 'Lista de usuários',
    isArray: true,
    example: [
      {
        id: 'cuid1234567890',
        name: 'João da Silva',
        email: 'joao@example.com',
        cpf: '18765210077',
        role: 'ADMIN',
        created_at: '2023-10-01T12:00:00Z',
        updated_at: '2023-10-01T12:00:00Z',
        deleted_at: null,
      },
    ],
  })
  data: GetUserOutput[];

  @ApiProperty({
    description: 'Metadados de paginação',
    type: PaginationMetaDto,
  })
  meta: PaginationMetaDto;
}
