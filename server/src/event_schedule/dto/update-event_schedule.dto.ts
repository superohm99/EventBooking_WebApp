import { Type } from 'class-transformer';
import { IsMongoId, IsDate, IsOptional } from 'class-validator';
// FK: event_id
// start_date
// end_date
// start_time
// end_time

export class CreateEventScheduleDto {
    @IsOptional()
    @IsMongoId()
    readonly event?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    readonly start_date?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    readonly end_date?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    readonly start_time?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    readonly end_time?: Date;

}