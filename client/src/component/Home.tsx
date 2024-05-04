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

    const [events, setEvents] = useState<Event[]>([])

    const [data, setData] = useState([])
    useEffect(() => {
        setEvents(eventsData.events.slice(0, 5));
        
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/events/events_data')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
      },[]);

    console.log("data", data)

    return (
        <>
            <div className='first-fold'>
                <Navbar />
                <div className='background-container'>
                    <img className='background' src="https://ichef.bbci.co.uk/news/976/cpsprodpb/14AD7/production/_116659648_gettyimages-1297927990_cut.jpg" alt="background" />
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
                    {
                        data.map((event: any, index: number) => (
                            <EventCard key={index} image={event.image} month={2} date={12} title={event.event_name} description={event.event_description} />
                        ))
                    }
                    {/* <EventCard image='https://external-preview.redd.it/attack-on-titan-requiem-grissini-project-orchestra-v0-h-q3XoGrVBMrNVw1PCezbgshGzsUolWMeZ-xWb8QONc.jpg?auto=webp&s=5d910f4990f31cfea0ce6a0db934a4be360d8a9d' month={2} date={3} title='Attack On Titan Orchrestra : The Final Season Eren Yeager in another multiverse' description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Non minus blanditiis nemo, iure aliquam rerum amet voluptatem quas vero nisi suscipit dolorem atque voluptate placeat expedita quam dicta inventore architecto. ' />
                    <EventCard image='https://www.kennedy-center.org/globalassets/education/resources-for-educators/classroom-resources/artsedge/media/guide-to-the-orchestra/2022_11_03_nso_group_photo-169.png' month={7} date={1} title='Fullmetal Alchemist : Brotherhood' description='the best performance from Sawano' />
                    <EventCard image='https://staticg.sportskeeda.com/editor/2023/12/f046d-17021936776189-1920.jpg' month={9} date={10} title='PRX vs SENTINELS VCT LOCKIN Final' description='SEN TenZ said I will win if you guys buy they sentinel bundle' />
                    <EventCard image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw0zWkbd3yOG4L-AvCvjwKkoQ68m5czntqGtWaq_jRUQ&s' month={11} date={23} title='GENG Fan meet Pattaya' description='meet the New era team of Korean,  GENG' /> */}
                </div>
            </div>
        </>
    )
}

export default Home