import { Game } from '@prisma/client';

export class GameResponseDto {
  id: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  created_at: Date;
  updated_at: Date;

  constructor(game: Game) {
    this.id = game.id;
    this.title = game.title;
    this.description = game.description;
    this.thumbnail = game.thumbnail;
    this.created_at = game.created_at;
    this.updated_at = game.updated_at;
  }
}