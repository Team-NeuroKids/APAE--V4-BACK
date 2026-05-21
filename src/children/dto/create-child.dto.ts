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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateChildDto {
  @ApiProperty({
    example: 'João',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '18765210077',
  })
  @Length(11, 14)
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({
    enum: Gender,
    example: Gender.MALE,
  })
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @ApiProperty({
    example: '2026-01-14T06:29:57.929Z',
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  birth_date: Date;

  @ApiPropertyOptional({
    example: 'Autismo',
  })
  @IsString()
  @IsOptional()
  diagnosis?: string;

  @ApiPropertyOptional({
    example: 'http://example.com/avatar.jpg',
  })
  @IsString()
  @IsOptional()
  avatar_url?: string;
}
