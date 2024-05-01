import React , {useEffect, useState} from 'react'
import '../style/Form_reserve.css'
import axios from 'axios'


function Form_reserve() {
  const [data, setData] = useState([])
  useEffect(()=> {
    // axios.get('https://jsonplaceholder.typicode.com/posts')
    axios.get('http://localhost:3001/events/events_data')
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  },[])
  return (
    <div className='Tone'>
        <div className='Tone-1'>

                <div className="Tone-card">
                    <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                    <div className='Tone-container'>
                    <p>Concert Music The Talent</p>
                    <p>Date: 26/08/2566</p>
                    </div>
                </div>

                {/* <div>
                {data.map(item => (
                  <div>{item.event_name} {item.rating}</div>
                ))}
                </div> */}

                <div className='Show-detail'>
                    <p >Date: 26/08/2566</p>
                    <p >Time: 19.00</p>
                    <p >Location: Bangkok Ladkrabang Street 12</p>
                    <p >Reserve: 1020/2500</p>
                    <p >Budget: 450 ฿</p>
                </div>

        </div>
    </div>
  )
}

export default Form_reserve
