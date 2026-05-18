import { GameHistory } from '@prisma/client';
import { PaginationMetaDto } from 'src/common/dtos/pagination-meta.dto';

export class PaginatedGameHistoriesResponseDto {
  data: GameHistory[];
  meta: PaginationMetaDto;
}
