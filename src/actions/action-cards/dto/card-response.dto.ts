import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CardResponseDto {
  @ApiProperty({
    description: 'ID do card (CUID)',
    example: 'cuid1234567890',
  })
  id: string;

  @ApiProperty({
    description: 'Categoria do card',
    example: 'Alimentação',
  })
  category: string;

  @ApiProperty({
    description: 'Rótulo do card',
    example: 'Comer',
  })
  label: string;

  @ApiProperty({
    description: 'URL da imagem do card',
    example: 'https://exemplo.com/imagem.png',
  })
  image_url: string;

  @ApiProperty({
    description: 'URL do áudio do card',
    example: 'https://exemplo.com/audio.mp3',
  })
  audio_url: string;

  @ApiProperty({
    description: 'Data de criação',
    example: '2023-10-01T12:00:00Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Data da última atualização',
    example: '2023-10-01T12:00:00Z',
  })
  updated_at: Date;

  @Exclude()
  deleted_at: Date | null;

  constructor(partial: Partial<CardResponseDto>) {
    Object.assign(this, partial);
  }
}
