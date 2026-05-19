import { Gender } from 'src/common/enums/gender.enum';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ChildResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    example: 'João',
  })
  name: string;

  @ApiProperty({
    enum: Gender,
    example: Gender.MALE,
  })
  gender: string;

  @ApiProperty({
    example: '2020-01-01',
  })
  birth_date: Date;

  @ApiProperty({
    example: 'Autismo',
  })
  diagnosis: string | null;

  @ApiProperty({
    example: 'http://example.com/avatar.jpg',
  })
  avatar_url: string | null;

  @ApiProperty({
    example: '2020-01-01',
  })
  created_at: Date;

  @ApiProperty({
    example: '2020-01-01',
  })
  updated_at: Date;

  @Exclude()
  cpf: string;

  @Exclude()
  deleted_at: Date | null;

  constructor(partial: Partial<ChildResponseDto>) {
    Object.assign(this, partial);
  }
}
