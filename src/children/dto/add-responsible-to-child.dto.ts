import { IsNotEmpty, IsString } from 'class-validator';

export class AddResponsibleToChildDto {
  @IsNotEmpty()
  @IsString()
  responsibleId: string;
}
