import { IsString, IsNumber, IsUrl, IsNotEmpty, IsMongoId, Min, IsOptional } from 'class-validator';
// event_name
// event_description
// image
// rating
// venue
export class UpdateEventDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    readonly event_name?: string;

    @IsOptional()
    @IsString()
    readonly event_description?: string;

    @IsOptional()
    @IsUrl()
    readonly image?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    readonly rating?: number;

    @IsOptional()
    @IsNotEmpty()
    @IsMongoId()
    readonly venue?: string;

}