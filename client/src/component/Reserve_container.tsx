import React, { useEffect, useState } from 'react'
import '../style/Reserve_container.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Reserve_cont {
  filter: string
}

export type EventProps = {
  event_name: string;
  event_location: string;
  event_date: Date;
  event_time: Date;
  image: string;
  seats: string[];
  venue: string;
  eventschedules: {
    start_date: Date;
    end_date: Date;
    start_time: Date;
    end_time: Date;
    _id: string;
  }[];
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

  useEffect(() => {
    console.log("data", data)
  },[data])
  
  return (
    <div className='Center-container'>

      {data.map(item => (
        <Link to={{pathname:`/Reserve/Confirm-reserve/${item._id}`}} >

        <div className="Card">
          <img src={item.image}/>
          <div className="Container">
            <h3><b>{item.event_name}</b></h3>
            {item.eventschedules.map(schedule => (
              <div key={schedule._id}>
               <h3>Date: {schedule.start_date.toString().slice(0,10)}</h3>
            </div>
            ))}
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
