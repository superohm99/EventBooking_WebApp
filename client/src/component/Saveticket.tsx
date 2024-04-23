import React from 'react'
import Navbar from './Navbar'
import '../style/Saveticketstyle.css'

function Saveticket() {

  const handlePrinter = () => {
    // Hide elements outside the ticket class
    const elementsToHide = document.querySelectorAll('.ticketinformation > *:not(.ticket)') as NodeListOf<HTMLElement>;
    elementsToHide.forEach(element => {
      element.style.display = 'none';
    });
  
    // Print the ticket
    window.print();
  
    // Restore visibility of hidden elements
    elementsToHide.forEach(element => {
      element.style.display = '';
    });
  }

  //left
  const ticket_type ="VIP PASS"
  const sec="D";
  const row="12";
  const seat="35";

  //middle
  const ticket_id = 12345678;
  const concert_name = "2024 IU H.E.R";
  const concert_detail = "world tour concert in bangkok";
  const date = "29/6/2024";

  const address = "IMPACT CHALLENGER";
  const show_time = "00.00PM"

  //right side  
  const name = "Teeruth Ieowsakulrat";
  const user_id = "65010495";
  const ticket_barcode = "https://th.bing.com/th/id/R.fdfe4de36de6f105aacc3f9c3bd9f653?rik=wY4c4L9HqPwz0g&riu=http%3a%2f%2fderekbeaulieu.files.wordpress.com%2f2011%2f04%2ftextfestival-barcode-1.jpg&ehk=whAV4ee2sEjJyEKkVkc62BBT1rAchmi1noJM01fsFrY%3d&risl=&pid=ImgRaw&r=0" 



  return (
    <section>
      <div className="ticketinformation">
        <Navbar/>
        <div className="ticket">
          <div className="container">
            <div className="container-5">
              <span className="ticket-type">
                {ticket_type}
              </span>
              <div className="rectangle-3"></div>
              <div className="seat-rectangle"></div>

              <span className="sec-row-seat_container">
                <span className="sec" >
                  <div>
                    <span style={{ fontSize: '16px' }}>Sec</span>
                    <span style={{ fontSize: '25px' }}>{sec}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '16px' }}>Row</span>
                    <span style={{ fontSize: '25px' }}>{row}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '16px' }}>Seat</span>
                    <span style={{ fontSize: '25px' }}>{seat}</span>
                  </div>  
                </span>
              </span>

            </div>
             
            <div className="container-3">
              <div className="ticket-id">
                No.{ticket_id}
              </div>
              <div className="concert-name">
                {concert_name}
              </div>
              <div className="concert-detail">
                {concert_detail}
              </div>
              <div className="container-2">
                <span className="date">
                  <span style={{color: 'blue'}}>Date </span>
                  {date}
                </span>
                <span className="gate">
                  Gate
                </span>
                <span className="address">
                  {address}
                </span>
                
              </div>
              <span className="showtime">
                <span style={{color: 'blue'}}>Show time - </span>
                {show_time}
              </span>
            </div>
            <div className="line-1"></div>
            <div className="polygon-1"></div>
            <div className="polygon-2"></div>
            <div className="container-1">
              <div className="web-logo">
                WEB LOGO
              </div>
              <div className="name">
                Name
              </div>
              <div className="user-detail">
                {name}
              </div>
              <div className="userid">
                Userid
              </div>
              <div className="user-detail">
                {user_id}
              </div>
              <div className="ticket-barcode">
                <img src={ticket_barcode}
            alt="barcode"></img>
              </div>
            </div>
  
        </div>
       
      </div>
      <div className="button">
        <button className="download-ticket" onClick={handlePrinter}>
          Download ticket
        </button>
      </div>
      
    </div>
    </section>
  )
}

export default Saveticket
