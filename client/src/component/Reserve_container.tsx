import React, { useEffect, useState } from 'react'
import '../style/Reserve_container.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Reserve_cont {
  filter: string
}

export type VenueProps = {
  venue_name: string;
  venue_location: string;
  capacity: number;
  _id: string;
}

export type EventScheduleProps = {
  start_date: Date;
  end_date: Date;
  start_time: Date;
  end_time: Date;
  _id: string;
}

export type SeatProps = {
  class: string;
  type: string;
  section: string;
  row: number;
  seat_num: number;
  price: number;
}

export type EventProps = {
  event_name: string;
  event_description: string;
  image: string;
  rating: number;
  eventschedules: EventScheduleProps[];
  venue: VenueProps;
  seats: SeatProps[];
  _id: string;
}


function Reserve_container(props: Reserve_cont) {

  const [data, setData] = useState<EventProps[]>([])
  const [filterdata, setFilterData] = useState('')

  useEffect(() => {
      setFilterData(props.filter)
  } , [props.filter])

  useEffect(() => {
    axios.post('http://localhost:3001/events/events_data',{filter :filterdata})
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  },[filterdata]);
  
  return (
    <div className='Center-container'>
      
      {data.map(item => (
        <Link to={{pathname:`/Reserve/Confirm-reserve/${item._id}`}} className='Link-form-reserve'>

        <div className="Card">
          <img src={item.image}/>
          <div className="Container">
            <h1>Event: {item.event_name}</h1>
            <h3>Description: {item.event_description}</h3>
            {item.eventschedules.map(schedule => (
              <div key={schedule._id}>
               <h3>Date: {schedule.start_date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h3>
              </div>
            ))}
            <h3 id='rating-show'>Rating: {item.rating} </h3>
          </div>
        </div>

          </Link>
      ))}


  
      <div className='test-text'>
      </div>
    </div>
  )
}

export default Reserve_container
