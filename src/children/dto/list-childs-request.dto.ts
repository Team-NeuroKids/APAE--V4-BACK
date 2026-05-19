import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CursorPaginationDto } from 'src/common/dtos/pagination.dto';

export class ListChildsRequestDto extends CursorPaginationDto {
  @ApiPropertyOptional({
    example: 'João',
  })
  @IsOptional()
  @IsString()
  search?: string;
}
