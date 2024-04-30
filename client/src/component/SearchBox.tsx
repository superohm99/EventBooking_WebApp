import React, { useState } from 'react'
import SearchBoxPart from './SearchBoxPart'
import SearchBoxPartDate from './SearchBoxPartDate'
import '../style/SearchBox.css'

function SearchBox() {
    const [selectedEventId, setSelectedEventId] = useState('');
    const [response1, setResponse1] = useState('');
    const [response2, setResponse2] = useState('');

    const handleEventSelect = (eventId: string) => {
        setSelectedEventId(eventId);
    };

    const handleResponse = (name: string) => {
        console.log(name);
        setResponse1(name);
    };
    const handleResponse2 = (name: string) => {
        console.log(name);
        setResponse2(name);
    };
    return (
        <div className='container'>
            <SearchBoxPart title="Search Event" path="http://localhost:3001/events/events_name/" onEventSelect={handleEventSelect} check={true} result={handleResponse}/>
            <SearchBoxPart title="Place" list={selectedEventId} path="http://localhost:3001/events/events_place/" check={false} result={handleResponse2} />
            <SearchBoxPartDate />
        </div>
    )
}

export default SearchBox