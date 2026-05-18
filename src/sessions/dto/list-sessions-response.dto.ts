import { PaginationMetaDto } from 'src/common/dtos/pagination-meta.dto';
import { Session } from '@prisma/client';

export class PaginatedSessionsResponseDto {
  data: Session[];
  meta: PaginationMetaDto;
}
