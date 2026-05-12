import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from 'src/common/enums/gender.enum';

export class CreateChildDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Length(11, 14)
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

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
