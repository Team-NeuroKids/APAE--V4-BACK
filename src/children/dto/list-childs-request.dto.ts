import { IsOptional, IsString } from 'class-validator';
import { CursorPaginationDto } from 'src/common/dtos/pagination.dto';

export class ListChildsRequestDto extends CursorPaginationDto {
    @IsOptional()
    @IsString()
    search?: string;
}
