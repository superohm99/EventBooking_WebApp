import '../style/Login.css'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

interface LoginState {
    email: string;
    password: string;
    error: string | null;
}

function Login () {
  const [loginState, setLoginState] = useState<LoginState>({
    email: '',
    password: '',
    error: null,
  })

  useEffect(() => {
    // Apply gradient background to body when component mounts
    document.body.style.background = 'rgb(2,0,36)';
    document.body.style.background = 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(121,9,9,1) 50%, rgba(255,0,0,1) 100%)';

    // Cleanup function to revert background when component unmounts
    return () => {
      document.body.style.background = '';
    };
  }, []);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState({ ...loginState, email: event.target.value });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState({ ...loginState, password: event.target.value });
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(loginState);
  };

  return (
    <div className="signin">
        <h1>Welcome Back!</h1>
        <form>
            <div className="input-field">
              <i><FontAwesomeIcon icon={faEnvelope} /></i>
              <input type="email" value={loginState.email} onChange={handleEmailChange} placeholder="Email Address" />
            </div>
            <div className="input-field">
              <i><FontAwesomeIcon icon={faLock} /></i>
            <input type="password" value={loginState.password} onChange={handlePasswordChange} placeholder="Password" />
            </div>
            <div className="remember-forgot">
                <label>
                    <input type="checkbox" />
                    <p>Remember me</p>
                </label>
                <p><a href="#">Forgot Password?</a></p>
            </div>
            <button type="submit" onClick={handleSubmit}>Login</button>
            <div className="signup-option">
              <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
        </form>
    </div>
  )
}

export default Login