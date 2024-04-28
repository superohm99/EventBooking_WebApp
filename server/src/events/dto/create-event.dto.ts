import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

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
