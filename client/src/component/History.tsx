import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../style/History.css";
import Profile from "./Profile";
import Navbar from "./Navbar";

function History() {
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // send "values" to database
    console.log("search...");
  };

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
            <div className="history-list">test result...</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default History;
