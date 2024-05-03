import React , {useEffect, useState} from 'react'
import '../style/Form_reserve.css'
import axios from 'axios'


function Form_reserve(props:any) {
  // console.log(props.object)
  const [rendered, setRendered] = useState(false);
  const [event, setEvent] = useState([])
  const [eventsch, setEventsch] = useState([])
  const [venue, setVenue] = useState([])

  // useEffect(() => {
  //   console.log("5555")
  //   setEventsch(props.object[0].eventschedules)
  //   console.log(eventsch)
  // },[event])

  useEffect(()=> {
      setRendered(true);
      setEvent(props.object[0])
      setVenue(props.object[1])
      setEventsch(props.object[0].eventschedules)
  },[])
  
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
                    {<p>Date: {event.eventschedules[0].start_date}</p>}
                    </div>
                </div>


                <div className='Show-detail'>
               
                    <p>Date: {eventsch[0].start_date}</p>
                    <p >Time: 19.00</p>
                    <p >Location: {venue.location}</p>
                    <p >Reserve: 1020/2500</p>
                    <p >Budget: 450 ฿</p>
                </div>

        </div>
    </div>
  )
}

export default Form_reserve
