import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty({
    example: 'cuid0987654321',
    description: 'ID da criança associada a esta sessão',
  })
  @IsNotEmpty()
  @IsString()
  childId: string;
}
