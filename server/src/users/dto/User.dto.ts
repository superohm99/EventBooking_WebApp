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