import { PaginationMetaDto } from 'src/common/dtos/pagination-meta.dto';
import { CardResponseDto } from './card-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedCardsResponseDto {
  @ApiProperty({
    description: 'Lista de cards',
    isArray: true,
    type: CardResponseDto,
  })
  data: CardResponseDto[];

  @ApiProperty({
    description: 'Metadados de paginação',
    type: PaginationMetaDto,
  })
  meta: PaginationMetaDto;
}
