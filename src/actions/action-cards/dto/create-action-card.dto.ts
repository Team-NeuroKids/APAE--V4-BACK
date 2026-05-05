import { IsNotEmpty, IsString } from 'class-validator';

export class CreateActionCardDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  image_url: string;

  @IsString()
  @IsNotEmpty()
  audio_url: string;
}
