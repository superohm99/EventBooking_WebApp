import axios from 'axios';
import '../style/SearchBoxPart.css'
import { useEffect, useState } from 'react';

interface SearchBoxPartProps {
    title: string;
    list: string;
    path: string;
    onEventSelect: (eventId: string) => void;
    result: (name: string) => void;
    check:boolean;
   }


function SearchBoxPart(props: SearchBoxPartProps) {
    

    const [eventName, setEventName] = useState('');
    const [num,setNum] = useState(1);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const { title, list , path , onEventSelect, result, check} = props

    const handleInputChange = async (event:any) => {
        const name = event.target.value;
        setEventName(name);
    };
    
    const focus = () => {
        setNum(num*(-1));
        return true
    }

    const handleEventSelect = (eventId: string, eventname: string) => {
        // เรียกใช้ prop onEventSelect เพื่อส่ง event_id กลับไปยัง SearchBox
        result(eventname);
        focus();
        setEventName(eventname)
        if (check)
            onEventSelect(eventId);
    };


    if (check)
    {
        useEffect(() => {
        
            const fetchData = async () => {
                try {
                    // console.log(eventName)
                    const response = await axios.post(path, { name: eventName });
                    // console.log(response.data)
                    setFilteredEvents(response.data);
                    // onEventSelect(response.data);
                } catch (error) {
                    console.error('Error searching events:', error);
                }
            };
        
            fetchData();
        }, [eventName]);
    }
    else
    {
        useEffect(() => {
        
            const fetchData = async () => {
                try {
                    const response = await axios.post(path, { id: list });
                    // console.log(list)
                    console.log(response.data);
                    setFilteredEvents(response.data);
                } catch (error) {
                    console.error('Error searching events:', error);
                }
            };
        
            fetchData();
        }, [num]);
    }

    return (
        <div className='part-container'>
            <p>{title}</p>
            <div className='list-container'>
                <input
                    type="text"
                    value={check ? eventName:filteredEvents.name}
                    onChange={handleInputChange}
                    onFocus={focus}
                    placeholder="Enter event name"
                />
                {/* <ul>

                    {check ?filteredEvents.map((event) => (
                    <li key={event._id} onClick={() => handleEventSelect(event._id,event.event_name)}>{event.event_name}</li>
                    )): <li onClick={() => handleEventSelect(filteredEvents._id,filteredEvents.name)}>{filteredEvents.name} {filteredEvents.location}</li>}


                </ul> */}
                <hr />
            </div>
        </div>
    )
}

export default SearchBoxPart