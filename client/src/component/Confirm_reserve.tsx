import React from 'react'
import Navbar from './Navbar'
import Bottombar from './Bottombar'
import Form_reserve from './Form_reserve'
import '../style/Form_reserve.css'


function Confirm_reserve() {
  return (
    <div>
        <Navbar/>
        <div className='Form-reserve'> 
        <Form_reserve/>

        <div className='Tone-2'>
            <div>
                <h3>RESERVE TICKET</h3>
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
