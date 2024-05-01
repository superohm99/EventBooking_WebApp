import '../style/Login.css'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { FormError } from '../constants'
import { handleLoginValidation } from './InputValidation'
import axios from 'axios';

interface LoginState {
    email: string;
    password: string;
}

function Login () {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormError>({});
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

  const navigate = useNavigate();
  const [redirect, setRedirect] = useState<boolean>(false);

  if (redirect) {
    navigate('/', { replace: true });
  }

  const handleLogin = async () => {
    try {
      let token;

      await axios.post('http://localhost:3001/users/login', JSON.stringify(loginState), {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        console.log(res.data);
        token = res.data.access_token;
        console.log('token', token);
        localStorage.setItem("access_token",token);
      });

      setRedirect(true);
    } catch (err) {
      console.error('error', err);
    }
  }

  useEffect(() => {
    if (submitted) {
      // console.log(loginState);
      handleLogin();
    }

    return () => {
      setSubmitted(false);
    }
  }, [submitted]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginState({ ...loginState, [name]: value });
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const validateErrors: FormError = handleLoginValidation(loginState.email, loginState.password);
    setErrors(validateErrors);
    console.log(validateErrors);
    if (Object.keys(validateErrors).length === 0) {
      setSubmitted(true);
      alert('Login Success');
    }
  };

  return (
    <div className="signin">
        <h1>Welcome Back!</h1>
        <form>
            <div className="input-group">
              <div className="input-field">
                <i><FontAwesomeIcon icon={faEnvelope} /></i>
                <input type="email" name="email" value={loginState.email} onChange={handleChange} placeholder="Email Address" autoFocus/>
              </div>
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="input-group">
              <div className="input-field">
                <i><FontAwesomeIcon icon={faLock} /></i>
              <input type="password" name="password" value={loginState.password} onChange={handleChange} placeholder="Password" />
              </div>
              {errors.password && <p className="error">{errors.password}</p>}
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