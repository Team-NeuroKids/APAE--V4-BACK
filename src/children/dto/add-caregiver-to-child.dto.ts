import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddCaregiverToChildDto {
  @IsNotEmpty()
  @IsUUID()
  caregiverId: string;
}
