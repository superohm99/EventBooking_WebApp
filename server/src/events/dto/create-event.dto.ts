import { IsString, IsNumber, IsUrl, IsNotEmpty, IsMongoId, Min } from 'class-validator';
// event_name
// event_description
// image
// rating
// venue
export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    readonly event_name: string;

    @IsString()
    readonly event_description: string;

    @IsUrl()
    readonly image: string;

    @IsNumber()
    @Min(0)
    readonly rating: number;

    @IsNotEmpty()
    @IsMongoId()
    readonly venue: string;

}