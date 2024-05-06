import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClockRotateLeft,
  faPenToSquare,
  faLock,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import "../style/Profile.css";
import { useState, useEffect, useMemo } from "react"; 
import axios from "axios";

interface EditState {
  username: string;
  email: string;
}

function Profile() {
  const [userInfo, setUserinfo] = useState<EditState>({
    username: "",
    email: "",
  });

  let token = localStorage.getItem("access_token");

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3001/users/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.data) {
          localStorage.removeItem("access_token");
          navigate('/', { replace: true });
        }
      }).catch((err) => {
        console.log("error", err);
      })
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    fetch("http://localhost:3001/users/user_info/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserinfo({
          ...userInfo,
          username: data.user.username,
          email: data.user.email,
        });
        console.log("Username", userInfo);
        console.log(data);
      });
  }, []);

  const isLong = useMemo(() => userInfo.username.length > 14, [userInfo.username]);

  return (
    <>
      <div className="menu-bar">
        <div className="menu-header">
          <div className="profile">
            <p className="profile-pic">{userInfo.username[0]}</p>
            <h1 className="heading">{isLong? `${userInfo.username.slice(0, 14)}...`: userInfo.username}</h1>
            <p>{userInfo.email}</p> 
          </div>
          <ul className="menu-list">
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
                <p onClick={handleLogout}>Sign Out</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Profile;