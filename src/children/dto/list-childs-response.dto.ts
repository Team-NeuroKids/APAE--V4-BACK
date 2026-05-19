import { PaginationMetaDto } from 'src/common/dtos/pagination-meta.dto';
import { ChildResponseDto } from './child-response.dto';

export class PaginatedChildsResponseDto {
  data: ChildResponseDto[];
  meta: PaginationMetaDto;
}
