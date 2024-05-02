import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Slider from './Slider';
import SearchBox from './SearchBox';
import EventCard from './EventCard';
import EventFilter from './EventFilter';
import eventsData from "../data/evets.json"
import '../style/Home.css'
import axios from 'axios';

interface Event {
    title: string;
    description: string;
    img: string;
}

function Home() {


    const [data, setData] = useState([])
    useEffect(() => {
        setData(eventsData.events.slice(0, 5));
        
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/events/events_data')
        .then(res => setData(res.data))
        .catch(err => console.log(err));

      },[]);

    console.log('events:',data)
    
    return (
        <>
            <div className='first-fold'>
                <Navbar />
                <div className='background-container'>
                    <img className='background' src="https://ichef.bbci.co.uk/news/976/cpsprodpb/14AD7/production/_116659648_gettyimages-1297927990_cut.jpg"></img>
                    <div className='slider'>
                        <Slider events={data} />
                    </div>
                </div>
                <div className='search-box'>
                    <SearchBox />
                </div>
            </div>

            <div className='upcoming-event'>
                <EventFilter />
                <div className='event-card-container'>
                    {data.map(item => (
                    <EventCard image={item.image} month={11} date={23} title={item.event_name} description={item.event_description} />
                    ))}
                    
                </div>
            </div>
        </>
    )
}

export default Home