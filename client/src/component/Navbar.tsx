import { useEffect, useMemo, useState } from "react";
import "../style/Navbar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface DropDownProps {
  username: string;
  handleLogout: () => void;
}

const DropDown = ({ username, handleLogout }: DropDownProps) => {
  const isLong = useMemo(() => username.length > 12, [username]);

  return (
    <div className="dropdown active">
      <div className="dropdown-profile">
        <Link to="/Profile" className="no-underline">
          <h2>{isLong? `${username.slice(0, 12)}...` : username}</h2>
          <p>View your profile</p>
        </Link>
      </div>
      <div className="dropdown-content">
        <Link to="/Profile/Myticket">
          <a>My Ticket</a>
        </Link>
        <Link to="/Profile/History">
          <a>Purchase History</a>
        </Link>
        <Link to="/Profile">
          <a>Edit Profile</a>
        </Link>
        <Link to="/Profile/Changepasswd">
          <a>Change Password</a>
        </Link>
        <a onClick={handleLogout}>Sign Out</a>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  let token = localStorage.getItem("access_token");
  console.log("token", token);

  useEffect(() => {
    if (token) {
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
        getUserInfo();
      }
    }
  }, [token]);

  const getUserInfo = async () => {
    try {
      await axios
       .get(`http://localhost:3001/users/user_info/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
       .then((res) => {
          setUsername(res.data.user.username);
        });
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3001/users/logout", {
          Authorization: `Bearer ${token}`,
      }).then((res) => {
        if (res.data) {
          console.log("logout success", res.data);
          localStorage.removeItem("access_token");
          setIsAuthenticated(false);
        }
      }).catch((err) => {
        console.log("error", err);
      })
    } catch (err) {
      console.log("error", err);
    }
  };

  // toggle dropdown
  const toggleDropdown = () => {
    const dropdown = document.querySelector(".dropdown") as HTMLElement;
    dropdown.classList.toggle("active");
  };

  return (
    <div className="Navbar-container">
      <div className="Title-name">MYTICKET</div>

      <div className="Select-path">
        <Link to="/" className="no-underline">
          <a>Home</a>
        </Link>
        <Link to="/Reserve" className="no-underline">
          <a>Reserve</a>
        </Link>
        <a>Help</a>
      </div>

      {/* <div className="Select-option">
          <Link to="/Signin">
            <button className="Signin">Login</button>
          </Link>
          <Link to="/Signup">
            <button className="Signup">Register</button>
          </Link>
        </div> */}

      {isAuthenticated ? (
        <div className="Select-option">
          <a className="profile-pic" onClick={toggleDropdown}>
            {username.charAt(0)}
          </a>
          <DropDown
            username={username}
            handleLogout={handleLogout}
          />
        </div>
      ) : (
        <div className="Select-option">
          <Link to="/Signin">
            <button className="Signin">Login</button>
          </Link>
          <Link to="/Signup">
            <button className="Signup">Register</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
