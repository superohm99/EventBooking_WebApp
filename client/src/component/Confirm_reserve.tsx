import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Bottombar from './Bottombar'
import Form_reserve from './Form_reserve'
import '../style/Form_reserve.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { EventProps, SeatProps, VenueProps } from './Reserve_container'
import { useNavigate } from 'react-router-dom'

interface InputReserve {
  seat_class: string
  seat_number: number
}

type UserProps = {
  username: string
  email: string
  _id: string
}

type EventConfirmProps = {
  event: EventProps;
  seats: SeatProps[];
  venue: VenueProps;
}

type ReceiptProps = {
  event_name: string;
  event_description: string;
  image: string;
  event_location: string;
  event_date: string;
  event_time: string;
  seat_type: string;
  seat_section: string;
  seat_row: string;
  seat_num: string;
  seat_price: string;
}


function Confirm_reserve() {

  const params = useParams()
  const [event,setEvent] = useState<EventProps>({} as EventProps)
  const [seats,setSeats] = useState<SeatProps[]>([] as SeatProps[])
  const [userinfo,setUserinfo] = useState<UserProps>({} as UserProps)
  const [seatid,setSeatid] = useState("")

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedRow, setSelectedRow] = useState('');
  const [selectedSeatNum, setSelectedSeatNum] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [receipt, setReceipt] = useState<ReceiptProps>({} as ReceiptProps)

  const navigate = useNavigate()

  const uniqueValues = (arr:any) => {
    return Array.from(new Set(arr));
  };

  const handleClassChange = (filter:React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClass = filter.target.value;
    setSelectedClass(selectedClass);
    setSelectedSection('');
    setSelectedRow('');
    setSelectedSeatNum('');
    setSelectedPrice('');
  }
  
  const handleSectionChange = (filter:React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSection = filter.target.value;
    setSelectedSection(selectedSection);
    setSelectedRow('');
    setSelectedSeatNum('');
    setSelectedPrice('');
  }

  const handleRowChange = (filter:React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRow = filter.target.value;
    setSelectedRow(selectedRow);
    setSelectedSeatNum('');
    setSelectedPrice('');
  }

  const handleSeatNumChange = (filter:React.ChangeEvent<HTMLSelectElement>) => {
    const selectedNum = filter.target.value;
    setSelectedSeatNum(selectedNum);
    setSelectedPrice('');
  }

  const handlePriceChange = (filter:React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = JSON.parse(filter.target.value);
    const selectedPrice = selectedOption.price; 
    const selectedSeatId = selectedOption.id; 
    setSeatid(selectedSeatId);
    setSelectedPrice(selectedPrice);
  }

  const handlesubmit = () => {
    console.log("submit")
    console.log("selectedPrice", selectedPrice)
    console.log("userinfo", userinfo.username)
    if(!selectedPrice || !userinfo.username) return
    setIsSubmitted(true)  
  }

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    axios("http://localhost:3001/users/user_info/get",
    {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
    .then((data) =>{ 
      setUserinfo(data.data.user)
    })
      setSeats(event.seats)
      console.log("event", event)
  },[event])

  useEffect(()=>{
    axios.get(`http://localhost:3001/reserve/${params.Id}`)
    .then(res => res.data)
    .then(data => {
      setEvent(data)
      setSeats(data.seats)
    })
  },[params.Id])


  useEffect(() => {
    if(isSubmitted){
      const createReserve = async () => {
          try{
            const token = localStorage.getItem("access_token")
            const response = await axios.post(
              `http://localhost:3001/reserve/${params.Id}/create_reserve`,
              JSON.stringify({seat_id: seatid}),
              {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
            })
            const data = await response.data
            console.log("data", data)
            console.log("reserveId", data.reserveId)
            const reserveId = data.reserveId
            if(reserveId){
              console.log("Success")
              navigate(`/checkout/${reserveId}`, { state: { eventId: params.Id } })
            } else {
              console.log("Error")
            }
            
          } catch(err){
            console.log("Error", err)
          }
      }

      createReserve()
    }

    return () => {
      setIsSubmitted(false)
    }
}, [isSubmitted])

  if (!seats && true)
    {
      return null
    }

  return (
    <div>
        <Navbar/>
         <div className='Form-reserve'> 
        { Object.keys(event).length > 0 && <Form_reserve data={{ event, price: selectedPrice }}/> }
        <div className='Tone-2'>
            <div>
                <h1>RESERVE TICKET</h1>
            </div>

            <h2>Username: {userinfo.username}</h2>

            <form className='form_select'>

              <select value={selectedClass} onChange={handleClassChange}>
                <option value="" disabled selected>Seat-Class</option>
                {uniqueValues(seats.map(item => item.type)).map((type, index) => (
                  <option value={type} key={index}>{type}</option>
                ))}
              </select>

              <br/>

              <select value={selectedSection} onChange={handleSectionChange} disabled={!selectedClass}>
                <option value="" disabled selected>Seat-Section</option>
                {uniqueValues(seats.filter(item => item.type === selectedClass).map(item => item.section)).map((section, index) => (
                  <option value={section} key={index}>{section}</option>
                      ))}
              </select>

              <br/>

              <select value={selectedRow} onChange={handleRowChange} disabled={!selectedSection}>
                <option value="" disabled selected>Seat-Row</option>
                {uniqueValues(seats.filter(item => item.type === selectedClass && item.section === selectedSection).map(item => item.row)).map((row, index) => (
                  <option value={row} key={index}>{row}</option>
                ))}
              </select>

              <br/>
              

              <select value={selectedSeatNum} onChange={handleSeatNumChange} disabled={!selectedRow}>
                <option value="" disabled selected>Seat-Num</option>
                {uniqueValues(seats.filter(item => item.type === selectedClass && item.section === selectedSection && item.row === selectedRow).map(item => item.seat_num)).map((seat_num, index) => (
                  <option value={seat_num} key={index}>{seat_num}</option>
                ))}
              </select>

              <br/>

              <select value={selectedPrice} onChange={handlePriceChange} disabled={!selectedSeatNum}>
                <option value="" disabled selected>Seat-Price</option>
                {uniqueValues(seats.filter(item => item.type === selectedClass && item.section === selectedSection && item.row === selectedRow && item.seat_num === selectedSeatNum).map(item => ({price: item.price, id: item._id}))).map(item => (
                  <option value={JSON.stringify({ id: item.id, price: item.price })} key={item.id}>{item.price}</option>
                ))}
              </select>
              <br/>
            </form>

            <div className='Tone-2-button'>
              <Link to="/reserve">
                <button id='back-1'>BACK</button>
              </Link>
              <button type='button' onClick={handlesubmit}>RESERVE</button>
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