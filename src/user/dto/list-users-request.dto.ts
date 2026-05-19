import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CursorPaginationDto } from 'src/common/dtos/pagination.dto';

export class ListUsersRequestDto extends CursorPaginationDto {
  @ApiPropertyOptional({
    description: 'Termo para busca pelo nome, email ou CPF do usuário',
    example: 'João',
  })
  @IsOptional()
  @IsString()
  search?: string;
}
