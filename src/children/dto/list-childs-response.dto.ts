import { ChildResponseDto } from './child-response.dto';

class PaginationMetaDto {
  nextCursor: string | null;
  hasNextPage: boolean;
}

export class PaginatedChildsResponseDto {
  data: ChildResponseDto[];
  meta: PaginationMetaDto;
}
