import { IsNotEmpty, IsString } from 'class-validator';

export class CreateActionLogDto {
  @IsString()
  @IsNotEmpty()
  child_id: string;

  @IsString()
  @IsNotEmpty()
  session_id: string;

  @IsString()
  @IsNotEmpty()
  action_card_id: string;
}
