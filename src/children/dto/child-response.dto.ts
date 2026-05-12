import { Exclude } from 'class-transformer';

export class ChildResponseDto {
  id: string;
  name: string;
  gender: string;
  birth_date: Date;
  diagnosis: string | null;
  avatar_url: string | null;

  created_at: Date;
  updated_at: Date;

  @Exclude()
  cpf: string;

  @Exclude()
  deleted_at: Date | null;

  constructor(partial: Partial<ChildResponseDto>) {
    Object.assign(this, partial);
  }
}
