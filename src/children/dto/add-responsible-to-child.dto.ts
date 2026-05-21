import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddResponsibleToChildDto {
  @ApiProperty({
    example: 'kbzny5ftzs7pctb7eb9uk58u',
  })
  @IsNotEmpty()
  @IsString()
  responsibleId: string;
}
