import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser, faPhone, faIdCard, faLocationDot, faMailBulk } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../style/Signup.css'
import {
  validationAddress, validationConfirmPassword,
  validationCountry, validationDateOfBirth, validationDistrict, validationEmail, validationFullname, validationGender,
  validationIDCard, validationPassword, validationPhoneNumber, validationProvince,
  validationZipCode
} from './InputValidation'
import { Error, SignupState } from '../constants'

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

const Signup: React.FC = () => {
  const [buttonName, setButtonName] = useState<string>('Next');
  const [SignupState, setSignupState] = useState<SignupState>({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    idCard: '',
    dateOfBirth: {
      day: 1,
      month: 'January',
      year: 1998,
    },
    phoneNumber: '',
    address: '',
    country: 'Thailand',
    province: '',
    district: '',
    zipCode: '',
  })

  const [signupStep, setSignupStep] = useState<number>(1);

  const [errors, setErrors] = useState<Error>({});

  useEffect(() => {
    document.body.style.background = 'rgb(2,0,36)';
    document.body.style.background = 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(121,9,9,1) 50%, rgba(255,0,0,1) 100%)';

    return () => {
      document.body.style.background = '';
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setSignupState({ ...SignupState, [name]: value });
  }

  const handleDateOfBirth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSignupState({ ...SignupState, dateOfBirth: { ...SignupState.dateOfBirth, [name]: value } });
  };

  const handleBackButton = () => {
    setSignupStep(prev => prev - 1);
    setButtonName('Next');
  };

  const handleNextButton = () => {
    setSignupStep(prev => prev + 1);
    setButtonName('SIGN UP');
  };

  const handleFirstStepValidation = () => {
    const firstStepErrors: Error = {};
    const { fullname, email, password, confirmPassword } = SignupState;
    let fullnameError = validationFullname(fullname);
    let emailError = validationEmail(email);
    let passwordError = validationPassword(password);

    if (fullnameError) firstStepErrors.fullname = fullnameError;
    if (emailError) firstStepErrors.email = emailError;
    if (passwordError) firstStepErrors.password = passwordError;

    if (!fullnameError && !emailError && !passwordError) {
      let confirmPasswordError = validationConfirmPassword(password, confirmPassword);
      if (confirmPasswordError) firstStepErrors.confirmPassword = confirmPasswordError;
    }

    setErrors(firstStepErrors);
    if (Object.keys(firstStepErrors).length === 0) {
      handleNextButton();
    };
  };

  const handleSecondStepValidation = () => {
    const secondStepErrors: Error = {};
    const { idCard, phoneNumber, address, country, province, district, zipCode, gender } = SignupState;
    let idCardError = validationIDCard(idCard);
    let phoneNumberError = validationPhoneNumber(phoneNumber);
    let addressError = validationAddress(address);
    let countryError = validationCountry(country);
    let provinceError = validationProvince(province);
    let districtError = validationDistrict(district);
    let zipCodeError = validationZipCode(zipCode);
    let dateOfBirthError = validationDateOfBirth(SignupState.dateOfBirth);
    let genderError = validationGender(gender);

    if (idCardError) secondStepErrors.idCard = idCardError;
    if (phoneNumberError) secondStepErrors.phoneNumber = phoneNumberError;
    if (addressError) secondStepErrors.address = addressError;
    if (countryError) secondStepErrors.country = countryError;
    if (provinceError) secondStepErrors.province = provinceError;
    if (districtError) secondStepErrors.district = districtError;
    if (zipCodeError) secondStepErrors.zipCode = zipCodeError;
    if (dateOfBirthError) secondStepErrors.dateOfBirth = dateOfBirthError;
    if (genderError) secondStepErrors.gender = genderError;

    setErrors(secondStepErrors);
    console.log(secondStepErrors);
    if (Object.keys(secondStepErrors).length === 0) {
      console.log(SignupState);
      console.log('Success');
    };

  }

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (signupStep === 1) {
      handleFirstStepValidation();
    } else if (signupStep === 2) {
      handleSecondStepValidation();
    }

  };

  const firstInputStep = (
    <>
      <div className="input-group">
        <div className="input-info">
          <i><FontAwesomeIcon icon={faUser} /></i>
          <input type="text" value={SignupState.fullname} name="fullname" onChange={handleChange} placeholder="Full Name" />
        </div>
        {errors.fullname && <p className="error">{errors.fullname}</p>}
      </div>
      <div className="input-group">
        <div className="input-info">
          <i><FontAwesomeIcon icon={faEnvelope} /></i>
          <input type="email" value={SignupState.email} name="email" onChange={handleChange} placeholder="Email Address" />
        </div>
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div className="input-group">
        <div className="input-info">
          <i><FontAwesomeIcon icon={faLock} /></i>
          <input type="password" value={SignupState.password} name="password" onChange={handleChange} placeholder="Password" />
        </div>
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <div className="input-group">
        <div className="input-info">
          <i><FontAwesomeIcon icon={faLock} /></i>
          <input type="password" value={SignupState.confirmPassword} name="confirmPassword" onChange={handleChange} placeholder="Confirm Password" />
        </div>
      </div>
      {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
    </>
  );

  const secondInputStep = (
    <>
      <div className="input-info">
        <i><FontAwesomeIcon icon={faEnvelope} /></i>
        <input type="email" value={SignupState.email} readOnly />
      </div>
      <div className="input-group">
        <div className="input-info">
          <i><FontAwesomeIcon icon={faIdCard} /></i>
          <input type="text" value={SignupState.idCard} name="idCard" onChange={handleChange} placeholder="ID Card Number" />
        </div>
        {errors.idCard && <p className="error">{errors.idCard}</p>}
      </div>
      <div className="input-group">
        <div className="input-date">
          <p>Date of Birth</p>
          <select value={SignupState.dateOfBirth.day} name="day" onChange={handleDateOfBirth}>
            <option value="">Day</option>
            {days.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          <select value={SignupState.dateOfBirth.month} name="month" onChange={handleDateOfBirth}>
            <option value="">Month</option>
            {months.map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
          </select>
          <select value={SignupState.dateOfBirth.year} name="year" onChange={handleDateOfBirth}>
            <option value="">Year</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        {errors.dateOfBirth && <p className="error">{errors.dateOfBirth}</p>}
      </div>
      <div className="input-group">
        <div className="input-box">
          <p>Gender</p>
          <select value={SignupState.gender} name="gender" onChange={handleChange}>
            <option value="">Select</option>
            {genders.map((gender, index) => (
              <option key={index} value={gender}>{gender}</option>
            ))}
          </select>
        </div>
        {errors.gender && <p className="error">{errors.gender}</p>}
      </div>
      <div className="input-group">
        <div className="input-info">
          <i><FontAwesomeIcon icon={faPhone} /></i>
          <input type="phone" value={SignupState.phoneNumber} name="phoneNumber" onChange={handleChange} placeholder="Phone Number" />
        </div>
        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
      </div>
      <div className="input-group">
        <div className="input-info">
          <i><FontAwesomeIcon icon={faLocationDot} /></i>
          <textarea value={SignupState.address} name="address" onChange={handleChange} placeholder="Address" />
        </div>
        {errors.address && <p className="error">{errors.address}</p>}
      </div>
      <div className="input-date">
        <div className="input-group">
          <div className="input-country">
            <p>Country</p>
            <select value={SignupState.country} name="country" onChange={handleChange}>
              <option value={SignupState.country}>{SignupState.country}</option>
            </select>
          </div>
          {errors.country && <p className="error">{errors.country}</p>}
        </div>
        <div className="input-group">
          <div className="input-province">
            <p>Province</p>
            <select value={SignupState.province} name="province" onChange={handleChange}>
              <option value="">Select</option>
              {provinces.map((province) => (
                <option key={province.value} value={province.label}>{province.label}</option>
              ))}
            </select>
          </div>
          {errors.province && <p className="error">{errors.province}</p>}
        </div>
        <div className="input-group">
          <div className="input-district">
            <p>District</p>
            <select value={SignupState.district} name="district" onChange={handleChange}>
              <option value="">Select</option>
              {districts.map((district) => {
                if (district.province === SignupState.province) {
                  return district.district.map((district, index) => (
                    <option key={index} value={district}>{district}</option>
                  ))
                }
              })}
            </select>
          </div>
          {errors.district && <p className="error">{errors.district}</p>}
        </div>
      </div>
      <div className="input-group">
        <div className="input-info">
          <i><FontAwesomeIcon icon={faMailBulk} /></i>
          <input type="text" value={SignupState.zipCode} name="zipCode" onChange={handleChange} placeholder="Zip Code" />
        </div>
        {errors.zipCode && <p className="error">{errors.zipCode}</p>}
      </div>
    </>
  )

  return (
    <>
      <div className="signup">
        <h1>Join Us!</h1>
        <form>
          {signupStep === 1 ? firstInputStep : signupStep === 2 ? secondInputStep : null}
          <div className="button-option">
            <button type="submit" onClick={handleSubmit}>{buttonName}</button>
            {signupStep > 1 && <button type="button" onClick={handleBackButton}>Back</button>}
          </div>
          {signupStep === 1 && (
            <div className="signup-option">
              <p>Already have an account? <Link to="/signin">Sign In</Link></p>
            </div>
          )}
        </form>
      </div>
    </>
  )
}
export default Signup