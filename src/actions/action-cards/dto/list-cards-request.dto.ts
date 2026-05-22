import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CursorPaginationDto } from 'src/common/dtos/pagination.dto';

export class ListCardsRequestDto extends CursorPaginationDto {
  @ApiPropertyOptional({
    description: 'Termo para busca pela label do card',
    example: 'Comer',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por categoria do card',
    example: 'Alimentação',
  })
  @IsOptional()
  @IsString()
  category?: string;
}
