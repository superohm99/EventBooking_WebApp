import { PartialType } from '@nestjs/mapped-types';
import { CreateReserveDto } from './create-reserve.dto';

export class UpdateReserveDto extends PartialType(CreateReserveDto) {}
