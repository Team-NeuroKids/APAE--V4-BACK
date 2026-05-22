import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Game } from '@prisma/client';

export class GameResponseDto {
  @ApiProperty({ example: 'cuid1234567890' })
  id: string;

  @ApiProperty({ example: 'Jogo da Memória' })
  title: string;

  @ApiPropertyOptional({ example: 'Um jogo para treinar a memória...' })
  description: string | null;

  @ApiPropertyOptional({ example: 'https://example.com/thumb.png' })
  thumbnail: string | null;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiPropertyOptional()
  deleted_at: Date | null;

  constructor(game: Game) {
    this.id = game.id;
    this.title = game.title;
    this.description = game.description;
    this.thumbnail = game.thumbnail;
    this.created_at = game.created_at;
    this.updated_at = game.updated_at;
    this.deleted_at = game.deleted_at;
  }
}
