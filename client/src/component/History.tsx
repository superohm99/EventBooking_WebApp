import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../style/History.css";
import Profile from "./Profile";
import Navbar from "./Navbar";
import axios from "axios";
import { ReceiptProps } from "./Checkout";
import { Link } from "react-router-dom";

type PurchaseProps = ReceiptProps & {
  status: boolean,
  reserveId: string,
}

interface HistoryElementProps {
  historyData: PurchaseProps;
}

const HistoryElement: React.FC<HistoryElementProps> = ({ historyData }) => {
  return (
    <>
      <div className="history">
        <img src={historyData.image}
          alt="IMG" className="history__image" />
        <div className="history__pos">
          <div className="history__type">
            <span>Type</span>
            <span>{historyData.seat.type}</span>
          </div>
          <div className="history__section">
            <span>Sec</span>
            <span>{historyData.seat.section}</span>
          </div>
          <div className="history__row">
            <span>Row</span>
            <span>{historyData.seat.row}</span>
          </div>
          <div className="history__seat">
            <span>Seat</span>
            <span>{historyData.seat.seat_num}</span>
          </div>
        </div>
        <div className="history__info">
          <div className="history__event">
            <span>Event</span>
            <span>{historyData.event_name}</span>
          </div>
          <div className="history__date">
            <span>Date</span>
            <span>{new Date(historyData.event_schedule.start_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <div className="history__time">
            <span>Time</span>
            <span>{new Date(historyData.event_schedule.start_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
          </div>
          <div className="history__location">
            <span>Location</span>
            <span>{historyData.venue.location}</span>
          </div>
          <div className="history__price">
            <span>Price</span>
            <span>฿{historyData.seat.price}</span>
          </div>
          {historyData.status ?
            <button className="payment__button payment__button--success">PAY</button> :
            <Link style={{ textDecoration: 'none', textAlign: 'center', }} to={`/checkout/${historyData.reserveId}`} className="payment__button payment__button--pending">PAY</Link>
          }
        </div>
        {historyData.status ?
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

  const [purchaseList, setPurchaseList] = useState<PurchaseProps[]>([] as PurchaseProps[]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:3001/reserve/get_reserve_by_user", {}, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await response.data;
        // console.log("datalist", data)
        setPurchaseList(data.history);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
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
    console.log("purchaseList", purchaseList);
  }, [purchaseList]);

  return (
    <>
      <Navbar />
      <div className="box-container">
        <div className="history-container">
          <Profile/>
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
              {purchaseList.map((data, index) => (
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
