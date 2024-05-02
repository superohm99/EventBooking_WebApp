import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Bottombar from './Bottombar'
import Form_reserve from './Form_reserve'
import '../style/Form_reserve.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'


function Confirm_reserve() {

  const params = useParams()
  const [event,setEvent] = useState([])
  console.log(params.Id)

  useEffect(()=>{
    axios.get(`http://localhost:3001/reserve/${params.Id}`)
    .then(res => setEvent(res.data))
  },[params.Id])

  return (
    <div>
        <Navbar/>
        <div className='Form-reserve'> 
        {event.length > 0 && <Form_reserve object={event}/>}

        <div className='Tone-2'>
            <div>
                <h3>RESERVE TICKET</h3>
                {/* {JSON.stringify(params)} */}
            </div>

            <input placeholder='FirstName'></input>
            <input placeholder='SurName'></input>
            <input placeholder='Phone Number'></input>
            <input placeholder='Email'></input>
            <input placeholder='Seat-Class'></input>
            <input placeholder='Seat-Number'></input>

            <div className='Tone-2-button'>
                <button id='back-1'>BACK</button>
                <button id='next-1'type='submit'>NEXT</button>
            </div>
            
        </div>

        </div>
      <div className='Bottombar'>
        <Bottombar hideContainer={true}/>
      </div>
    </div>
  )
}

export default Confirm_reserve
