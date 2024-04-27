import '../style/Navbar.css'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
      <div className='Navbar-container'>
          <div className='Title-name'>
            MYTICKET
          </div>
          
          <div className='Select-path'>
            <Link to="/" className='nav_menu'>
              <a >Home</a>
            </Link>
            <Link to="/Reserve" className='nav_menu'>
              <a>Reserve</a>
            </Link>
            {/* <Link to="/Profile" className='nav_menu'>
              <a >Profile</a>
            </Link> */}
            <a >Help</a>
          </div>
          
          <div className='Login-signup'>
            <Link to='/Signin'><button className='Login'>Login</button></Link>
            <Link to='/Signup'><button className='Signup'>Signup</button></Link>
          </div>
 
      </div>
    )
}

export default Navbar;