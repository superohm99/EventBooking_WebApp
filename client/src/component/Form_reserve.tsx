import React , {useEffect, useState} from 'react'
import '../style/Form_reserve.css'
import axios from 'axios'
import { EventProps, VenueProps, EventScheduleProps } from './Reserve_container'

type FormProps = {
  data: {
    event: EventProps,
    price: string
  }
}

function Form_reserve({data}: FormProps) {
  const [rendered, setRendered] = useState(false);
  const [event, setEvent] = useState<EventProps>({} as EventProps)
  const [eventsch, setEventsch] = useState<EventScheduleProps>({} as EventScheduleProps)
  const [venue, setVenue] = useState<VenueProps>({} as VenueProps)

  useEffect(()=> {
      setRendered(true);
      setEvent(data.event)
      setVenue(data.event.venue)
      setEventsch(data.event.eventschedules[0])
  },[])

  useEffect(() => {
    console.log(eventsch)
  },[event,venue,eventsch])
  
  if (!rendered) {
    return null;
  }
  return (
    <div className='Tone'>
        <div className='Tone-1'>

                <div className="Tone-card">
                    <img src={event.image}/>
                    <div className='Tone-container'>
                    <p>{event.event_name}</p>
                    <p>Date: {new Date(eventsch.start_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                </div>


                <div className='Show-detail'>
               
                    <p>Date: {new Date(eventsch.start_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    <p >Time: {new Date(eventsch.start_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                    <p >Location: {venue.name} {venue.location}</p>
                    <p >Reserve:     1500/{venue.capacity}</p>
                    <p >Budget: {data.price}</p>
                </div>

        </div>
    </div>
  )
}

export default Form_reserve
