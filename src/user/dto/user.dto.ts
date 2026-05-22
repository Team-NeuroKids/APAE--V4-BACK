import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { UserRole } from 'src/common/enums/roles.enum';
import { IsCpf } from 'src/common/decorators/cpf.decorator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

@IsCpf()
@IsNotEmpty()
cpf!: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 100)
  password!: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(UserRole)
  role!: UserRole;
}
