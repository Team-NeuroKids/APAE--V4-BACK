import { Exclude } from 'class-transformer';

export class CardResponseDto {
  id: string;
  label: string;
  image_url: string;
  audio_url: string;
  created_at: Date;
  updated_at: Date;

  @Exclude()
  deleted_at: Date | null;

  constructor(partial: Partial<CardResponseDto>) {
    Object.assign(this, partial);
  }
}
