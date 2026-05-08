import { IsOptional, IsString } from 'class-validator';
import { CursorPaginationDto } from 'src/common/dtos/pagination.dto';

export class ListUsersRequestDto extends CursorPaginationDto {
    @IsOptional()
    @IsString()
    search?: string;
}
