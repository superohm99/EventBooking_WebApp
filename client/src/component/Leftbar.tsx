import React, { useEffect, useState } from 'react'
import '../style/Leftbar.css'
import axios from 'axios';

interface LeftsideProps {
  result: (name: string) => void;
 }


function Leftbar(props: LeftsideProps) {

  const [venues, setVenues] = useState([])
  const [events, setEvents] = useState([])

  const [filterone, setFilterone] = useState('')
  const [filtertwo, setFiltertwo] = useState('')
  const [filterthr, setFilterthr] = useState('')

  
  const {result} = props

  useEffect(() => {
    axios.get('http://localhost:3001/events/event_venues')
    .then(res => setVenues(res.data))
    .catch(err => console.log(err));
  },[]);


  useEffect(() => {
    axios.post('http://localhost:3001/events/events_data')
    .then(res => setEvents(res.data))
    .catch(err => console.log(err));
  },[]);

  const handlefilterone = (filter:React.ChangeEvent<HTMLSelectElement>) => {
    setFilterone(filter.target.value);
    console.log(filter.target.value);
  };

  const handlefiltertwo = (filter:React.ChangeEvent<HTMLSelectElement>) => {
    setFiltertwo(filter.target.value);
    console.log(filter.target.value);
  };

  const handlefilterthr = (filter:React.ChangeEvent<HTMLSelectElement>) => {
    setFilterthr(filter.target.value);
    console.log(filter.target.value);
  };

  const handlesubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    result(filterone+"$"+filtertwo+"$"+filterthr);
  }


  return (
    <div className='Leftbar-container'>
      <div className='filter-container'>
      <form>
      <select name="cars" id="cars" onChange={handlefilterone}>
        <option value=""disabled selected>Rating</option>
        {events.map(item => (
        <option value={item.rating} key={item._id}>{item.rating}</option>
         ))}
      </select>

      <br/>

      <select name="cars" id="cars" onChange={handlefiltertwo}>
        <option value="" disabled selected>Category</option>
        {events.map(item => (
        <option value={item.event_description} key={item._id}>{item.event_description}</option>
         ))}
      </select>

      <br/>

      <select name="cars" id="cars" onChange={handlefilterthr}>
        <option value="" disabled selected>Location</option>
        {venues.map(item => (
        <option  value={item.location} key={item._id}>{item.location}</option>
         ))}
      </select>



      <button type='submit' onClick={handlesubmit}>FILTER</button>
      </form>
  
      </div>
    </div>
  )
}

export default Leftbar
