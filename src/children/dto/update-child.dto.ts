import { IsOptional, IsString } from 'class-validator';

export class UpdateChildDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  birthDate?: string;

  @IsOptional()
  @IsString()
  diagnosis?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;
}
