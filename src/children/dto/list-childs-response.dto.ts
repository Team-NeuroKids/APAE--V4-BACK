import { PaginationMetaDto } from 'src/common/dtos/pagination-meta.dto';
import { ChildResponseDto } from './child-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedChildsResponseDto {
  @ApiProperty({
    type: [ChildResponseDto],
    description: 'Lista de crianças',
  })
  data: ChildResponseDto[];

  @ApiProperty({
    type: PaginationMetaDto,
    description: 'Metadados da paginação',
  })
  meta: PaginationMetaDto;
}
