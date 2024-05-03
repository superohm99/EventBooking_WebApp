import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Bottombar from './Bottombar'
import Form_reserve from './Form_reserve'
import '../style/Form_reserve.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

interface InputReserve {
  seat_class: string
  seat_number: number
}


function Confirm_reserve() {


  const params = useParams()
  const [event,setEvent] = useState([])
  const [seats,setSeats] = useState([])
  const [userinfo,setUserinfo] = useState([])
  const [seatid,setSeatid] = useState("")

  console.log(params.Id)

  const [input, setInput] = useState<InputReserve>({
    seat_class: " ",
    seat_number: 0,
  })
  

  const handleseatid = (filter:React.ChangeEvent<HTMLSelectElement>) => {
    setSeatid(filter.target.value);
  };

  const handlesubmit = () => {
    const token = localStorage.getItem("access_token")
    axios.post("http://localhost:3001/reserve/create_reserve",
    {
      eventid: event[0]._id,
      seatid: seatid,
      authorization: `Bearer ${token}`,
    }).then((res) => res.data)
    console.log("thhanjslkafjalfj")
  }

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    axios("http://localhost:3001/users/user_info/get",
    {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
    .then((data) =>{ console.log("test"),console.log(data.data.user),setUserinfo(data.data.user)})
    setSeats(event[2])
    // console.log("master")
    // console.log(seats)
  },[event])

  useEffect(()=>{
    axios.get(`http://localhost:3001/reserve/${params.Id}`)
    .then(res => setEvent(res.data))
  },[params.Id])

  if (!seats && true)
    {
      return null
    }

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

            <h2>Username: {userinfo.username}</h2>

            <form>

             <select  >
               <option value="" disabled selected>Seat-Class</option>
               {seats.map(item => (
              <option  value={item.type} key={item._id}>{item.type}</option>
              ))}
            </select>

              <br/>

            <select  >
               <option value="" disabled selected>Seat-Section</option>
               {seats.map(item => (
              <option  value={item.section} key={item._id}>{item.section}</option>
              ))}
            </select>

            <br/>

            <select   >
               <option value="" disabled selected>Seat-Row</option>
               {seats.map(item => (
              <option  value={item.row} key={item._id}>{item.row}</option>
              ))}
            </select>

            <br/>

            <select  >
               <option value="" disabled selected>Seat-Num</option>
               {seats.map(item => (
              <option  value={item.seat_num} key={item._id}>{item.seat_num}</option>
              ))}
            </select>

            <br/>

            <select   onChange={handleseatid}>
               <option value="" disabled selected>Seat-Price</option>
               {seats.map(item => (
              <option  value={item._id} key={item._id}>{item.price}</option>
              ))}
            </select>

            <br/>



            </form>


            <div className='Tone-2-button'>
                <button id='back-1'>BACK</button>
                <button id='next-1'type='submit' onClick={handlesubmit}>NEXT</button>
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
