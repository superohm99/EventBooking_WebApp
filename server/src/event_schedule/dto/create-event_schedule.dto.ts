import { IsNotEmpty, IsMongoId, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
// FK: event_id
// start_date
// end_date
// start_time
// end_time

export class CreateEventScheduleDto {
    @IsNotEmpty()
    @IsMongoId()
    readonly event: string;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    readonly start_date: Date;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    readonly end_date: Date;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    readonly start_time: Date;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    readonly end_time: Date;

}
