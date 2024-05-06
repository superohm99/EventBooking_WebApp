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
import { useState, useEffect } from "react";

interface EditState {
  username: string;
  email: string
}

interface profielProps {
  username: string;
  email: string
}

function Profile(props: profielProps) {

  return (
    <>
      <div className="menu-bar">
        <div className="menu-header">
          <div className="profile">
            <p className="profile-pic">{props.username.charAt(0)}</p>
            <h1 className="heading">{props.username}</h1>
            <p>{props.email}</p>
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
              <Link to="/Profile/" className="menu-item">
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
              <div className="menu-item main-color">
                <FontAwesomeIcon icon={faRightFromBracket} />
                <p>Sign Out</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Profile;
