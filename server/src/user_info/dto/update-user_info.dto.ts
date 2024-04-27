import { PartialType } from '@nestjs/mapped-types';
import { CreateUserInfoDto } from './create-user_info.dto';

export class UpdateUserInfoDto extends PartialType(CreateUserInfoDto) {}
