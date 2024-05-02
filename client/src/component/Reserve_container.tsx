import React, { useEffect, useState } from 'react'
import '../style/Reserve_container.css'
import axios from 'axios';

interface Reserve_cont {
  filter: string
}


function Reserve_container(props: Reserve_cont) {

  const [data, setData] = useState([])
  const [filterdata, setFilterData] = useState('')

  useEffect(() => {
      console.log("555555")
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
                    // <EventCard image={item.image} month={11} date={23} title={item.event_name} description={item.event_description} />
        <div className="Card">
          <img src={item.image}/>
          <div className="Container">
            <h3><b>{item.event_name}</b></h3>
            {item.eventschedules.map(schedule => (
              <div key={schedule._id}>
               <h3>Date: {schedule.start_date}</h3>
            </div>
            ))}
          </div>
        </div>
      ))}


  
      <div className='test-text'>
      </div>
    </div>
  )
}

export default Reserve_container
