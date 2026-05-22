import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CursorPaginationDto } from 'src/common/dtos/pagination.dto';

export class ListActionLogsRequestDto extends CursorPaginationDto {
  @ApiPropertyOptional({ description: 'ID da sessão para filtrar os logs' })
  @IsOptional()
  @IsString()
  sessionId?: string;
}
