import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaDto {
  @ApiProperty({
    description: 'Próximo cursor',
    example: 'cuid1234567890',
  })
  nextCursor: string | null;

  @ApiProperty({
    description: 'Se existe próxima página',
    example: true,
  })
  hasNextPage: boolean;
}
