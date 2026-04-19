import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

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
  role!: string;
}
