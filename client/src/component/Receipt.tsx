import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faCalendarDay } from '@fortawesome/free-solid-svg-icons'
import '../style/Receipt.css'
import Navbar from './Navbar'

const Receipt = () => {
  const eventName: string = 'Drive in Senja: Back to the Future';
  const eventLocation: string = 'Parkiran Utama Mall @ Alam Sutera';
  const eventDate: Date = new Date();
  const eventTime: Date = eventDate;
  const eventImage: string = 'https://www.shutterstock.com/shutterstock/photos/1423222013/display_1500/stock-vector-music-event-poster-design-template-on-colorful-background-with-flowing-shape-illustration-for-web-1423222013.jpg';

  const selectedSeat: string[] = ['A1', 'A2', 'A3', 'A4', 'A5'];
  useEffect(() => {
    // Apply gradient background to body when component mounts
    document.body.style.background = 'rgb(2,0,36)';
    document.body.style.background = 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(121,9,9,1) 50%, rgba(255,0,0,1) 100%)';

    // Cleanup function to revert background when component unmounts
    return () => {
      document.body.style.background = '';
    };
  }, []);
  const handleSubmit = (): void => {
    alert('Thank you for your purchase!');
  }
  return (
    <>
      <Navbar />
        <div className="receipt">
          <h2>Event Detail</h2>
          <div className="event-description">
            <img src={eventImage} alt="Event Image" />
            <div className="event-info">
              <h3>{eventName}</h3>
              <div className="location-desc">
                <i><FontAwesomeIcon icon={faLocationDot} /></i>
                <p>{eventLocation}</p>
              </div>
              <div className="date-desc">
                <i><FontAwesomeIcon icon={faCalendarDay} /></i>
                <p>{eventDate.toDateString()} {eventTime.toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
          <h2 className="summary-title">Order Summary</h2>
          <div className="order-summary">
            <div className="selected-seat">
              <p>Selected Seat</p>
              <p>{selectedSeat.join(', ')}</p>
            </div>
            <div className="calculate-price">
              <div className="ticket-price">
                <p>Ticket Price</p>
                <p>50 $</p>
              </div>
              <div className="fee-price">
                <p>Admin Fee</p>
                <p>-</p>
              </div>
            </div>
            <div className="total-price">
              <p>Total</p>
              <p>250 $</p>
            </div>
          </div>
          <div className="button-option">
            <button type="submit">Back</button>
            <button type="submit" onClick={handleSubmit}>Continue</button>
          </div>
        </div>
    </>
  )
}

export default Receipt