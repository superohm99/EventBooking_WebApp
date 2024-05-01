import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateUserSettingsDto {
    @IsOptional()
    @IsBoolean()
    receiveNotifications?: boolean;
    @IsOptional()
    @IsBoolean()
    receiveEmails?: boolean;
    @IsOptional()
    @IsBoolean()
    receiveSMS?: boolean;
}

export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateUserSettingsDto)
    settings?: CreateUserSettingsDto;
}

export class LoginDto{
    email: string;
    
    password: string;
}

export class CreateUserInfoDto{
    date_of_birth: Date;

    id_card: string;

    gender: string;

    phone_no: string;

    address: string;

    country: string;

    province: string;

    district: string;

    postal_code: string;

    user_id: string;
}

//UpdateUserInfoDto
export class UpdateUserInfoDto{
    username: string

    date_of_birth: Date;

    id_card: string;

    gender: string;

    phone_no: string;

    address: string;

    country: string;

    province: string;

    district: string;

    postal_code: string;
}