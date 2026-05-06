import { GetUserOutput } from '../types';

class PaginationMetaDto {
  nextCursor: string | null;
  hasNextPage: boolean;
}

export class PaginatedUsersResponseDto {
  data: GetUserOutput[];
  meta: PaginationMetaDto;
}
