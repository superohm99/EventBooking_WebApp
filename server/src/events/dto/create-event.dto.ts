import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Types } from "mongoose";

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  event_name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  event_description?: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsNumber()
  @IsOptional()
  rating: number;

  @IsString()
  @IsNotEmpty()
  venue_id: string;
}

export class CreateEventSchDto{
    start_date: Date

    end_date:Date

    start_time:Date

    end_time:Date

    event_id: string
}

export class CreateVenueDto{
    venue_name:string

    venue_location:string

    capacity:number

    event_id: string
}

