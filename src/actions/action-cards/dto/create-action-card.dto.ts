import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { CardCategory } from '../enum/card-category.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateActionCardDto {
  @ApiProperty({
    description: 'Categoria do card de ação',
    enum: CardCategory,
    example: CardCategory.NECESSITIES,
  })
  @IsEnum(CardCategory)
  @IsNotEmpty()
  category: CardCategory;

  @ApiProperty({
    description: 'Rótulo ou nome do card',
    example: 'Comer',
  })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty({
    description: 'URL da imagem associada ao card',
    example: 'https://exemplo.com/imagem.png',
  })
  @IsString()
  @IsNotEmpty()
  image_url: string;

  @ApiProperty({
    description: 'URL do áudio associado ao card',
    example: 'https://exemplo.com/audio.mp3',
  })
  @IsString()
  @IsNotEmpty()
  audio_url: string;
}
