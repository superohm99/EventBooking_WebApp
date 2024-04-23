import '../style/Navbar.css'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
      <div className='Navbar-container'>
          <div className='Title-name'>
            MYTICKET
          </div>
          
          <div className='Select-path'>
            <a >Home</a>
            <a>Reserve</a>
            <a >Profile</a>
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