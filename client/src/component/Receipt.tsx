import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faCalendarDay } from '@fortawesome/free-solid-svg-icons'
import '../style/Receipt.css'
import { ReceiptProps } from './Checkout'
type ReceiptsProps = {
  event: ReceiptProps
}

const Receipt = ({ event }: ReceiptsProps) => {

  useEffect(() => {
    document.body.style.background = 'rgb(2,0,36)';
    document.body.style.background = 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(121,9,9,1) 50%, rgba(255,0,0,1) 100%)';

    return () => {
      document.body.style.background = '';
    };
  }, []);

  useEffect(() => {
    console.log("Event", event)
  }, [event])

  return (
    <>
        <div className="receipt">
          <h2>Event Detail</h2>
          <div className="event-description">

            <img src={event.image} alt="Event Image" />
            <div className="event-info">
              <h3>{event.event_name}</h3>
              <div className="location-desc">
                <i><FontAwesomeIcon icon={faLocationDot} /></i>
                <p>{event.venue.location}</p>

              </div>
              <div className="date-desc">
                <i><FontAwesomeIcon icon={faCalendarDay} /></i>
                <p>{new Date(event.event_schedule.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} {new Date(event.event_schedule.start_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
              </div>
            </div>
          </div>
          <h2 className="summary-title">Order Summary</h2>
          <div className="order-summary">
            <div className="selected-seat">
              <p>Selected Seat</p>
              <p>Type: {event.seat.type}, Section: {event.seat.section}, Row: {event.seat.row}, Seat Num: {event.seat.seat_num}</p>
            </div>
            <div className="calculate-price">
              <div className="ticket-price">
                <p>Ticket Price</p>
                <p>{event.seat.price} $</p>
              </div>
              <div className="fee-price">
                <p>Admin Fee</p>
                <p>-</p>
              </div>
            </div>
            <div className="total-price">
              <p>Total</p>
              <p>{event?.seat?.price} $</p>
            </div>
          </div>
        </div>
    </>
  )
}

export default Receipt