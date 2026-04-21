import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { UserRole } from 'src/common/enums/roles.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
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
