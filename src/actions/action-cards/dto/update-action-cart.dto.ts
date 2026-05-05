import { IsOptional, IsString } from 'class-validator';

export class UpdateActionCardDto {
  @IsString()
  @IsOptional()
  label?: string;

  @IsString()
  @IsOptional()
  image_url?: string;

  @IsString()
  @IsOptional()
  audio_url?: string;
}
