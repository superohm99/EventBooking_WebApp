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

  
  const set_descript = [
    {event_description:"Funny and Crazy"},
    {event_description:"Education and Trend Social"},
  
  ]

  const {result} = props

  const uniqueValues = (arr:any) => {
    return Array.from(new Set(arr));
  };


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
        {uniqueValues(events.map(item => item.rating)).map(rating => (
        <option value={rating}>{rating}</option>
         ))}
      </select>

      <br/>

      <select name="cars" id="cars" onChange={handlefiltertwo}>
        <option value="" disabled selected>Category</option>
        {set_descript.map(item => (
        <option value={item.event_description}>{item.event_description}</option>
         ))}
      </select>

      <br/>

      <select name="cars" id="cars" onChange={handlefilterthr}>
        <option value="" disabled selected>Location</option>
        {uniqueValues(venues.map(item => item.location)).map(location => (
        <option  value={location} >{location}</option>
         ))}
      </select>



      <button type='submit' onClick={handlesubmit}>FILTER</button>
      </form>
  
      </div>
    </div>
  )
}

export default Leftbar
