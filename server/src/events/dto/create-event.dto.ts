
export class CreateEventDto {
  event_name: string;
  event_description?: string;
  image?: string;
  rating?: number;
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

