import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGameDto {
  @ApiProperty({
    example: 'Jogo da Memória',
    description: 'Título do jogo',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({
    example: 'Um jogo para treinar a memória...',
    description: 'Descrição detalhada do jogo',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/thumb.png',
    description: 'URL da miniatura do jogo',
  })
  @IsString()
  @IsOptional()
  thumbnail?: string;
}
