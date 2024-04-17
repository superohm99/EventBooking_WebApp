import '../style/Navbar.css'

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
            <button className='Login'>Login</button>
            <button className='Signup'>Signup</button>
          </div>
      </div>
    )
}

export default Navbar;