import '../style/EventCard.css'

interface EventCardProps {
    image: string;
    month: number;
    date: number;
    title: string;
    description: string;
}

function EventCard(props: EventCardProps) {
    const { image, month, date, title, description } = props
    const monthNames = ['none', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    const monthName = monthNames[month]

    return (
        <div className="card-container">
            <div className="image-container">
                <img src={`${image}`} alt="img"></img>
            </div>
            <div className="info-container">
                <div className="date-container">
                    <div className="month">{monthName}</div>
                    <div className="date">{date}</div>
                </div>
                <div className="description-container">
                    <p className="event-title">
                        {title}
                    </p>
                    <p className="description">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default EventCard