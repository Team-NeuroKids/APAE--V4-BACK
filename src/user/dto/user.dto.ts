import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { UserRole } from 'src/common/enums/roles.enum';

export class CreateUserDto {
  @ApiProperty({
    example: 'João da Silva',
    description: 'Nome completo do usuário',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: 'joao@example.com',
    description: 'Endereço de email do usuário',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    example: '18765210077',
    description: 'CPF do usuário',
  })
  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  cpf!: string;

  @ApiProperty({
    example: 'senhaSegura123',
    description: 'Senha de acesso',
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 100)
  password!: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.DOCTOR,
    description: 'Papel (role) do usuário no sistema',
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(UserRole)
  role!: UserRole;
}
