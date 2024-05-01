import React, { useEffect, useState } from 'react'
import '../style/Reserve_container.css'
import axios from 'axios';

function Reserve_container() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/events/events_data')
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  },[]);
  
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
                {console.log(schedule.start_date)}
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
