import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'O endereço de email do usuário',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    example: 'senhaSegura123',
    description: 'A senha do usuário',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
