import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicketSimple,
  faClockRotateLeft,
  faPenToSquare,
  faLock,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../style/Profile.css";

function Profile() {
  return (
    <>    
    <div className="menu-bar">
      <div className="profile">
        <p className="profile-pic">B</p>
        <h1 className="heading">Ben Tennyson</h1>
        <p>ben10@gmail.com</p>
      </div>
      <ul className="menu-list">
        <li>
          <Link to="/Profile/Myticket" className="menu-item">
            <FontAwesomeIcon icon={faTicketSimple} />
            <p>My Ticket</p>
          </Link>
        </li>
        <li>
          <Link to="/Profile/History" className="menu-item">
            <FontAwesomeIcon icon={faClockRotateLeft} />
            <p>Purchase History</p>
          </Link>
        </li>
        <li>
          <Link to="/Profile/Edit" className="menu-item">
            <FontAwesomeIcon icon={faPenToSquare} />
            <p>Edit Profile</p>
          </Link>
        </li>
        <li>
          <Link to="/Profile/Changepasswd" className="menu-item">
            <FontAwesomeIcon icon={faLock} />
            <p>Change Password</p>
          </Link>
        </li>
        <li>
          <div className="menu-item">
            <FontAwesomeIcon icon={faRightFromBracket} className="main-color" />
            <p className="main-color">Sign Out</p>
          </div>
        </li>
      </ul>
    </div>
    </>
  );
}

export default Profile;