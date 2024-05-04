import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Bottombar from './Bottombar'
import Form_reserve from './Form_reserve'
import '../style/Form_reserve.css'
import { Link, useParams } from 'react-router-dom'
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


  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedRow, setSelectedRow] = useState('');
  const [selectedSeatNum, setSelectedSeatNum] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  console.log(params.Id)

  const [input, setInput] = useState<InputReserve>({
    seat_class: " ",
    seat_number: 0,
  })
  

  // const handleseatid = (filter:React.ChangeEvent<HTMLSelectElement>) => {
  //   setSeatid(filter.target.value);
  // };

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
    const selectedPrice = filter.target.value;
    setSeatid(filter.target.value);
    setSelectedPrice(selectedPrice);
  }


  const handlesubmit = () => {
    const token = localStorage.getItem("access_token")
    axios.post("http://localhost:3001/reserve/create_reserve",
    {
      eventid: event[0]._id,
      seatid: seatid,
      authorization: `Bearer ${token}`,
    }).then((res) => res.data)
    
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
                <h1>RESERVE TICKET</h1>
                {/* {JSON.stringify(params)} */}
            </div>

            <h2>Username: {userinfo.username}</h2>

            <form className='form_select'>

              <select value={selectedClass} onChange={handleClassChange}>
                <option value="" disabled selected>Seat-Class</option>
                {uniqueValues(seats.map(item => item.type)).map(type => (
                  <option value={type} key={type}>{type}</option>
                ))}
              </select>

              <br/>

              <select value={selectedSection} onChange={handleSectionChange} disabled={!selectedClass}>
                <option value="" disabled selected>Seat-Section</option>
                {uniqueValues(seats.filter(item => item.type === selectedClass).map(item => item.section)).map(section => (
                  <option value={section} key={section}>{section}</option>
                      ))}
              </select>

              <br/>

              <select value={selectedRow} onChange={handleRowChange} disabled={!selectedSection}>
                <option value="" disabled selected>Seat-Row</option>
                {uniqueValues(seats.filter(item => item.type === selectedClass && item.section === selectedSection).map(item => item.row)).map(row => (
                  <option value={row} key={row}>{row}</option>
                ))}
              </select>

              <br/>
              

              <select value={selectedSeatNum} onChange={handleSeatNumChange} disabled={!selectedRow}>
                <option value="" disabled selected>Seat-Num</option>
                {uniqueValues(seats.filter(item => item.type === selectedClass && item.section === selectedSection && item.row === selectedRow).map(item => item.seat_num)).map(seat_num => (
                  <option value={seat_num} key={seat_num}>{seat_num}</option>
                ))}
              </select>

              <br/>

              <select value={selectedPrice} onChange={handlePriceChange} disabled={!selectedSeatNum}>
                <option value="" disabled selected>Seat-Price</option>
                {uniqueValues(seats.filter(item => item.type === selectedClass && item.section === selectedSection && item.row === selectedRow && item.seat_num === selectedSeatNum).map(item => ({price: item.price, id: item._id}))).map(item => (
                  <option value={item.id} key={item.id}>{item.price}</option>
                ))}
              </select>

              <br/>



            </form>


            <div className='Tone-2-button'>
              <Link to="/reserve">
                <button id='back-1'>BACK</button>
              </Link>
                <Link to="/receipt" >
                <button id='next-1'type='submit' onClick={handlesubmit}>NEXT</button>
                </Link>
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
