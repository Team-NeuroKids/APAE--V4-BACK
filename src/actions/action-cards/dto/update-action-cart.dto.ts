import { CreateActionCardDto } from './create-action-card.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateActionCardDto extends PartialType(CreateActionCardDto) {}
