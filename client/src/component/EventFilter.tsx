import '../style/EventFilter.css'
import Filter from './Filter'

function EventFilter() {
    return (
        <div className='event-filter-container'>
            <p className='title'>UPCOMING EVENTS</p>
            {/* <div className='filter'>
                <Filter list={["Any date", "Weekdays", "Weekend"]} />
                <Filter list={["Any Type", "Sport", "Concert"]} />
                <Filter list={["Any Category", "b", "d"]} />
            </div> */}
        </div>

    )
}

export default EventFilter