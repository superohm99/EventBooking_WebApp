import React, { Component } from "react";
import "../style/Myticket.css";
import Profile from "./Profile";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface TicketProps {
  img: string;
  title: string;
  info: string;
  time: string;
  date: Date;
}

class Ticket extends Component<TicketProps> {
  render() {
    return (
      <div className="ticket-card">
        <img src={this.props.img} alt="ticket" />
        <div>Concert: {this.props.title}</div>
        <div>Venue: {this.props.info}</div>
        <div>Show Time: {this.props.time}</div>
        <div>Show Date: {this.props.date.toLocaleDateString()}</div>
      </div>
    );
  }
}

function Myticket() {
  return (
    <>
      <Navbar />
      <div className="box-container">
        <div className="ticket-container">
          <Profile />
          <div className="content">
            <h1 className="heading">My Ticket</h1>
            <div className="ticket-list">
              <Ticket
                img="https://www.thaiticketmajor.com/img_poster/prefix_1/2823/5823/bruno-mars-live-in-bangkok-65b856a8705a8-l.png"
                title="BRUNO MARS LIVE IN BANGKOK"
                info="Bangkok, Thailand"
                time="19:00"
                date={new Date("2024-03-30")}
              />
              <Ticket
                img="https://www.thaiticketmajor.com/img_poster/prefix_1/2892/5892/chris-james-announces-dopamine-overload-asia-tour-6614f97882ff9-l.png"
                title="Chris James : Dopamine Overload Asia Tour 2024 in Bangkok"
                info="Bangkok, Thailand"
                time="22:00"
                date={new Date("2024-08-18")}
              />
              <Ticket
                img="https://www.thaiticketmajor.com/img_poster/prefix_1/2878/5878/2023-2024-bambam-the-1st-world-tour-encore-area52-in-bangkok-presented-by-xiaomi-65f2b34d90239-l.jpg"
                title="2023-2024 BamBam THE 1ST WORLD TOUR ENCORE [AREA 52] in BANGKOK Presented by Xiaomi"
                info="Bangkok, Thailand"
                time="22:00"
                date={new Date("2024-08-04")}
              />
            </div>
            <button className="show-all-tickets">
              <p>show all tickets</p>
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Myticket;
