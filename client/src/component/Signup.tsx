import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser, faPhone, faIdCard, faLocationDot, faMailBulk } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../style/Signup.css'

interface DateOfBirth {
  day: number;
  month: number;
  year: number;
}
interface SignupState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  idCard: string;
  dateOfBirth: DateOfBirth;
  phoneNumber: string;
  address: string;
  country: string;
  province: string;
  district: string;
  zipCode: string;
  error: string | null;
}

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const years = Array.from({ length: 50 }, (_, i) => 1970 + i);

const genders = ['Male', 'Female', 'Other']

const provinces = [
  { label: 'Bangkok', value: 1 },
  { label: 'Chiang Mai', value: 2 },
  { label: 'Phuket', value: 3 },
]

const districts = [
  { province: 'Bangkok', district: ['Ladprao', 'Sathorn', 'Bangrak'] },
  { province: 'Chiang Mai', district: ['Muang', 'Sarapee', 'Doi Saket'] },
  { province: 'Phuket', district: ['Muang', 'Kathu', 'Thalang'] },
];

function Signup() {
  const [buttonName, setButtonName] = useState<string>('Next');
  const [SignupState, setSignupState] = useState<SignupState>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    idCard: '',
    dateOfBirth: {
      day: 1,
      month: 1,
      year: 1998,
    },
    phoneNumber: '',
    address: '',
    country: 'Thailand',
    province: '',
    district: '',
    zipCode: '',
    error: null,
  })

  const [signupStep, setsignupStep] = useState<number>(1);


  useEffect(() => {
    // Apply gradient background to body when component mounts
    document.body.style.background = 'rgb(2,0,36)';
    document.body.style.background = 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(121,9,9,1) 50%, rgba(255,0,0,1) 100%)';

    // Cleanup function to revert background when component unmounts
    return () => {
      document.body.style.background = '';
    };
  }, []);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupState({ ...SignupState, name: event.target.value });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupState({ ...SignupState, email: event.target.value });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupState({ ...SignupState, password: event.target.value });
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupState({ ...SignupState, confirmPassword: event.target.value });
  };

  const comparePassword = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
  }

  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSignupState({ ...SignupState, dateOfBirth: { ...SignupState.dateOfBirth, day: parseInt(event.target.value) } });
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSignupState({ ...SignupState, dateOfBirth: { ...SignupState.dateOfBirth, month: parseInt(event.target.value) } });
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSignupState({ ...SignupState, dateOfBirth: { ...SignupState.dateOfBirth, year: parseInt(event.target.value) } });
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSignupState({ ...SignupState, gender: event.target.value });
  };

  const handleIdCardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupState({ ...SignupState, idCard: event.target.value });
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupState({ ...SignupState, phoneNumber: event.target.value });
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSignupState({ ...SignupState, address: event.target.value });
  };

  const handleProvinceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSignupState({ ...SignupState, province: event.target.value });
  };
  const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSignupState({ ...SignupState, district: event.target.value });
  };

  const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupState({ ...SignupState, zipCode: event.target.value });
  };

  const handleBackButton = () => {
    setsignupStep(prev => prev - 1);
    setButtonName('Next');
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (signupStep === 1) {
      if (comparePassword(SignupState.password, SignupState.confirmPassword)) {
        setsignupStep(prev => prev + 1);
        setButtonName('SIGN UP');
      } else {
        setSignupState({ ...SignupState, error: 'Password does not match' });
      }
    } else if (signupStep === 2) {
      console.log(SignupState);
    }

  };

  const firstInputStep = (
    <>
      <div className="input-group">
        <i><FontAwesomeIcon icon={faUser} /></i>
        <input type="text" value={SignupState.name} onChange={handleNameChange} placeholder="Full Name" />
      </div>
      <div className="input-group">
        <i><FontAwesomeIcon icon={faEnvelope} /></i>
        <input type="email" value={SignupState.email} onChange={handleEmailChange} placeholder="Email Address" />
      </div>
      <div className="input-group">
        <i><FontAwesomeIcon icon={faLock} /></i>
        <input type="password" value={SignupState.password} onChange={handlePasswordChange} placeholder="Password" />
      </div>
      <div className="input-group">
        <i><FontAwesomeIcon icon={faLock} /></i>
        <input type="password" value={SignupState.confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Confirm Password" />
      </div>
    </>
  );

  const secondInputStep = (
    <>
      <div className="input-group">
        <i><FontAwesomeIcon icon={faEnvelope} /></i>
        <input type="email" value={SignupState.email} disabled />
      </div>
      <div className="input-group">
        <i><FontAwesomeIcon icon={faIdCard} /></i>
        <input type="text" value={SignupState.idCard} onChange={handleIdCardChange} placeholder="ID Card Number" />
      </div>
      <div className="input-date">
        <p>Date of Birth</p>
        <select value={SignupState.dateOfBirth.day} onChange={handleDayChange}>
          <option value="">Day</option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <select value={SignupState.dateOfBirth.month} onChange={handleMonthChange}>
          <option value="">Month</option>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select value={SignupState.dateOfBirth.year} onChange={handleYearChange}>
          <option value="">Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="input-box">
        <p>Gender</p>
        <select value={SignupState.gender} onChange={handleGenderChange}>
          <option value="">Gender</option>
          {genders.map((gender, index) => (
            <option key={index} value={gender}>
              {gender}
            </option>
          ))}
        </select>
      </div>
      <div className="input-group">
        <i><FontAwesomeIcon icon={faPhone} /></i>
        <input type="phone" value={SignupState.phoneNumber} onChange={handlePhoneChange} placeholder="Phone Number" />
      </div>
      <div className="input-group">
        <i><FontAwesomeIcon icon={faLocationDot} /></i>
        <textarea value={SignupState.address} onChange={handleAddressChange} placeholder="Address" />
      </div>
      <div className="input-date">
        <div className="input-country">
          <p>Country</p>
          <select value={SignupState.country}>
            <option value={SignupState.country}>{SignupState.country}</option>
          </select>
        </div>
        <div className="input-province">
          <p>Province</p>
          <select value={SignupState.province} onChange={handleProvinceChange}>
            <option value="">Province</option>
            {provinces.map((province) => (
              <option key={province.value} value={province.label}>
                {province.label}
              </option>
            ))}
          </select>
        </div>
        <div className="input-district">
          <p>District</p>
          <select value={SignupState.district} onChange={handleDistrictChange}>
            <option value="">District</option>
            {districts.map((district) => {
              if (district.province === SignupState.province) {
                return district.district.map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))
              }
            })}
          </select>
        </div>
      </div>
      <div className="input-group">
        <i><FontAwesomeIcon icon={faMailBulk} /></i>
        <input type="text" value={SignupState.zipCode} onChange={handleZipCodeChange} placeholder="Zip Code" />
      </div>
    </>
  )

  return (
    <div className="signup">
      <h1>Join Us!</h1>
      <form>
        {signupStep === 1 && firstInputStep}
        {signupStep === 2 && secondInputStep}
        <div className="button-option">
          <button type="submit" onClick={handleSubmit}>{buttonName}</button>
          {signupStep > 1 && <button type="button" onClick={handleBackButton}>Back</button>}
        </div>
        {SignupState.error && <p className="error">{SignupState.error}</p>}
        {signupStep === 1 && (
          <div className="signup-option">
            <p>Already have an account? <Link to="/signin">Sign In</Link></p>
          </div>
        )}
      </form>
    </div>
  )
}

export default Signup