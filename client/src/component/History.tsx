import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../style/History.css";
import Profile from "./Profile";
import Navbar from "./Navbar";


interface HistoryElementProps {
    historyData: HistoryProps;
}

interface HistoryProps {
    event_image: string;
    event_name: string;
    event_location: string;
    event_date: Date;
    event_time: Date;
    payment_status: boolean;
    user_id: string;
    section: string,
    row: string;
    seat: string;
    price: number;
}

const HistoryElement: React.FC<HistoryElementProps> = ({ historyData }) => {
  return (
    <>
      <div className="history">
        <img src={historyData.event_image}
          alt="IMG" className="history__image" />
        <div className="history__pos">
          <div className="history__section">
            <span>Sec</span>
            <span>{historyData.section}</span>
          </div>
          <div className="history__row">
            <span>Row</span>
            <span>{historyData.row}</span>
          </div>
          <div className="history__seat">
            <span>Seat</span>
            <span>{historyData.seat}</span>
          </div>
        </div>
        <div className="history__info">
          <div className="history__event">
            <span>Event</span>
            <span>{historyData.event_name}</span>
          </div>
          <div className="history__date">
            <span>Date</span>
            <span>{historyData.event_date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <div className="history__time">
            <span>Time</span>
            <span>{historyData.event_time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
          </div>
          <div className="history__location">
            <span>Location</span>
            <span>{historyData.event_location}</span>
          </div>
          <div className="history__price">
            <span>Price</span>
            <span>฿{historyData.price}</span>
          </div>
          {historyData.payment_status ?
            <button className="payment__button payment__button--success">PAY</button> :
            <button className="payment__button payment__button--pending">PAY</button>}
        </div>
        {historyData.payment_status ? 
          <div className="history__payment-status payment-status__success">Completed</div> :
          <div className="history__payment-status payment-status__pending">Pending</div>
        }
      </div>
    </>
  )
}


function History() {
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsSearch(true);
    console.log("search...");
  };
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [histories, setHistories] = useState<HistoryProps[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    fetch("http://localhost:3001/history",
      {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
      .then((res) => res.json())
      .then((data) => {
        const historyList: HistoryProps[] = [];
        data.forEach((element: any) => {
          const date = new Date(element.event_date);
          const time = new Date(element.event_time);
          const history: HistoryProps = {
            event_image: element.event_image,
            event_name: element.event_name,
            event_location: element.event_location,
            event_date: date,
            event_time: time,
            payment_status: element.payment_status,
            user_id: element.user_id,
            section: element.section,
            row: element.row,
            seat: element.seat,
            price: element.price,
          };
          historyList.push(history);
        });
        setHistories(historyList);
      });
  }, []);

  useEffect(() => {
    if (isSearch) {
      console.log("searching...");
    }

    return () => {
      setIsSearch(false);
    };
  }, [isSearch]);

  useEffect(() => {
    console.log("historyList set!", histories);
  }, [histories]);

  // const historyDataList: HistoryProps[] = [
  //   {
  //     event_image: "https://s3-ap-southeast-1.amazonaws.com/tm-img-poster-event/da6a1c12016011ef911101117567899b.jpg?opt=mild&resize=w200,h290",
  //     event_name: "Event Name 1sadfasdfasfasdfadsfad",
  //     event_location: "Tokyo Dome @Tokyo",
  //     event_date: new Date(),
  //     event_time: new Date(),
  //     payment_status: true,
  //     user_id: "user_id_1",
  //     section: "A",
  //     row: "1",
  //     seat: "A1",
  //     price: 100,
  //   },
  //   {
  //     event_image: "https://s3-ap-southeast-1.amazonaws.com/tm-img-poster-event/da6a1c12016011ef911101117567899b.jpg?opt=mild&resize=w200,h290",
  //     event_name: "Event Name 2",
  //     event_location: "Event Location 2sdfadfasdfasdfasdfafdsasfasdfasdfadfad",
  //     event_date: new Date(),
  //     event_time: new Date(),
  //     payment_status: false,
  //     user_id: "user_id_2",
  //     section: "B",
  //     row: "2",
  //     seat: "B2",
  //     price: 200,
  //   },
  //   {
  //     event_image: "https://s3-ap-southeast-1.amazonaws.com/tm-img-poster-event/da6a1c12016011ef911101117567899b.jpg?opt=mild&resize=w200,h290",
  //     event_name: "Event Name 3",
  //     event_location: "Event Location 3",
  //     event_date: new Date(),
  //     event_time: new Date(),
  //     payment_status: true,
  //     user_id: "user_id_3",
  //     section: "C",
  //     row: "3",
  //     seat: "C3",
  //     price: 300,
  //   },
  //   {
  //     event_image: "https://s3-ap-southeast-1.amazonaws.com/tm-img-poster-event/da6a1c12016011ef911101117567899b.jpg?opt=mild&resize=w200,h290",
  //     event_name: "Event Name 4",
  //     event_location: "Event Location 4",
  //     event_date: new Date(),
  //     event_time: new Date(),
  //     payment_status: false,
  //     user_id: "user_id_4",
  //     section: "D",
  //     row: "4",
  //     seat: "D4",
  //     price: 400,
  //   },
  //   {
  //     event_image: "https://s3-ap-southeast-1.amazonaws.com/tm-img-poster-event/da6a1c12016011ef911101117567899b.jpg?opt=mild&resize=w200,h290",
  //     event_name: "Event Name 5",
  //     event_location: "Event Location 5",
  //     event_date: new Date(),
  //     event_time: new Date(),
  //     payment_status: true,
  //     user_id: "user_id_5",
  //     section: "E",
  //     row: "5",
  //     seat: "E5",
  //     price: 500,
  //   },
  // ];
  return (
    <>
      <Navbar />
      <div className="box-container">
        <div className="history-container">
          <Profile />
          <div className="content">
            <h1 className="heading">Purchase History</h1>
            <div className="input-horizontal">
              <input
                type="text"
                placeholder="Search by events, name, location, and more"
              />
              <button
                type="submit"
                onClick={handleSubmit}
                className="search-btn"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                Search
              </button>
            </div>
            <div className="history-list">
              {histories.map((data, index) => (
                <HistoryElement key={index} historyData={data} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default History;
