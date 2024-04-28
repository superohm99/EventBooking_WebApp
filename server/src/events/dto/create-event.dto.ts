import { IsString, IsNumber, IsUrl, IsNotEmpty, IsMongoId, Min, Max } from 'class-validator';
import { Venue } from 'src/schemas/Venue.schema';
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
    @Max(5)
    readonly rating: number;

    @IsNotEmpty()
    @IsMongoId()
    readonly venue: Venue;

}