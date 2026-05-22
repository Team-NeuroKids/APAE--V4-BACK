import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateActionClickDto {
  @ApiProperty({
    description: 'ID do card de ação (CUID)',
    example: 'cuid1234567890',
  })
  @IsString()
  @IsNotEmpty()
  action_card_id: string;
}
export class CreateActionLogDto extends CreateActionClickDto {
  @ApiProperty({
    description: 'ID da criança',
    example: 'cuid1234567890',
  })
  @IsString()
  @IsNotEmpty()
  child_id: string;

  @ApiProperty({
    description: 'ID da sessão',
    example: 'cuid0987654321',
  })
  @IsString()
  @IsNotEmpty()
  session_id: string;
}
