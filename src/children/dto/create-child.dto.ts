import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateChildDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Length(11, 14)
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  birth_date: Date;

  @IsString()
  @IsOptional()
  diagnosis?: string;

  @IsString()
  @IsOptional()
  avatar_url?: string;
}
