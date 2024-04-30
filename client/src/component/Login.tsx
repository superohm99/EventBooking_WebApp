import '../style/Login.css'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

interface LoginState {
    email: string;
    password: string;
}

function Login () {
  const [loginState, setLoginState] = useState<LoginState>({
    email: '',
    password: '',
  })

  useEffect(() => {
    document.body.style.background = 'rgb(2,0,36)';
    document.body.style.background = 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(121,9,9,1) 50%, rgba(255,0,0,1) 100%)';
    return () => {
      document.body.style.background = '';
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginState({ ...loginState, [name]: value });
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
              <input type="email" name="email" value={loginState.email} onChange={handleChange} placeholder="Email Address" />
            </div>
            <div className="input-field">
              <i><FontAwesomeIcon icon={faLock} /></i>
            <input type="password" name="password" value={loginState.password} onChange={handleChange} placeholder="Password" />
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