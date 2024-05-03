import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faLock, faLocationDot, faPhone, faMailBulk } from '@fortawesome/free-solid-svg-icons'
import { SignupState, FormError, provinces, districts, genders, months, getDaysInMonth, range} from '../constants';
import { handleFirstSignupValidation, handleSecondSignupValidation } from './InputValidation';
import '../style/Register.css';
import axios from 'axios';
import{ jwtDecode } from 'jwt-decode';

interface FirstSignUpStepProps {
    inputData: SignupState;
    errorData: FormError;
    onNext: () => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const FirstSignUpStep: React.FC<FirstSignUpStepProps> = ({ onNext, handleChange, inputData, errorData }) => {
    
    return (
        <>
                <div className="input-group">
                    <div className="input-field">
                    <i><FontAwesomeIcon icon={faUser} /></i>
                    <input type="text" name="fullname" placeholder="Fullname" autoFocus onChange={handleChange} value={inputData.fullname} />
                    </div>
                    {errorData.fullname && <p className="error">{errorData.fullname}</p>}
                </div>
                <div className="input-group">
                    <div className="input-field">
                    <i><FontAwesomeIcon icon={faEnvelope} /></i>
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} value={inputData.email} />
                    </div>
                    {errorData.email && <p className="error">{errorData.email}</p>}
                </div>
                <div className="input-group">
                    <div className="input-field">
                    <i><FontAwesomeIcon icon={faLock} /></i>
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} value={inputData.password} />
                    </div>
                    {errorData.password && <p className="error">{errorData.password}</p>}
                </div>
                <div className="input-group">
                    <div className="input-field">
                    <i><FontAwesomeIcon icon={faLock} /></i>
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} value={inputData.confirmPassword} />
                    </div>
                    {errorData.confirmPassword && <p className="error">{errorData.confirmPassword}</p>}
                </div>
                <div className="button-group">
                    <button type="button" onClick={onNext}>Next</button>
                </div>
        </>
    )
};

interface SecondSignUpStepProps {
    inputData: SignupState;
    errorData: FormError;
    onBack: () => void;
    onSubmit: () => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleChangeBirthDate: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SecondSignUpStep: React.FC<SecondSignUpStepProps> = ({ onBack, onSubmit, handleChange, handleChangeBirthDate, inputData, errorData }) => {
    return (
        <>      
                <div className="input-group">
                    <div className="input-field input-readonly">
                        <i><FontAwesomeIcon icon={faEnvelope} /></i>
                        <input type="email" name="email" placeholder="Email" onChange={handleChange} value={inputData.email} readOnly />
                    </div>
                </div>

                <div className="input-birthday">
                    <p>Date of Birth</p>
                    <div className="input-dateofbirth">
                        <div className="input-day">
                            <select name="day" onChange={handleChangeBirthDate} value={inputData.dateOfBirth.day}>
                                <option value="">Day</option>
                                {range(1, getDaysInMonth(inputData.dateOfBirth.month, inputData.dateOfBirth.year)).map((day, index) => (
                                    <option key={index} value={day}>{day}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-month">
                            <select name="month" onChange={handleChangeBirthDate} value={inputData.dateOfBirth.month}>
                                <option value="">Month</option>
                                {months.map((month, index) => (
                                    <option key={index} value={index}>{month}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-year">
                            <select name="year" onChange={handleChangeBirthDate} value={inputData.dateOfBirth.year}>
                                <option value="">Year</option>
                                {
                                range(new Date().getFullYear()-100, new Date().getFullYear()).map((year, index) => (
                                    <option key={index} value={year}>{year}</option>
                                ))
                                }
                            </select>   
                        </div>
                    </div>
                    {errorData.dateOfBirth && <p className="error">{errorData.dateOfBirth}</p>}
                </div>

                <div className="input-group">
                    <div className="input-field">
                        <i><FontAwesomeIcon icon={faUser} /></i>
                        <input type="text" name="idCard" placeholder="ID Card" onChange={handleChange} value={inputData.idCard} />
                    </div>
                    {errorData.idCard && <p className="error">{errorData.idCard}</p>}
                </div>
                <div className="input-select">
                    <p>Gender</p>
                    <select name="gender" onChange={handleChange} value={inputData.gender}>
                        <option value="">Select Gender</option>
                        {genders.map((gender, index) => (
                        <option key={index} value={gender}>{gender}</option>
                        ))}
                    </select>
                    {errorData.gender && <p className="error">{errorData.gender}</p>}
                </div>
                <div className="input-group">
                    <div className="input-field">
                        <i><FontAwesomeIcon icon={faPhone} /></i>
                        <input type="text" name="phoneNumber" placeholder="Phone Number : 0xxxxxxxxx" onChange={handleChange} value={inputData.phoneNumber} />
                    </div>
                    {errorData.phoneNumber && <p className="error">{errorData.phoneNumber}</p>}
                </div>
                <div className="input-group">
                    <div className="input-field">
                        <i><FontAwesomeIcon icon={faLocationDot} /></i>
                        <textarea name="address" placeholder="Address" onChange={handleChange} value={inputData.address} />
                    </div>
                    {errorData.address && <p className="error">{errorData.address}</p>}
                </div>
                <div className="input-select">
                <p>Country</p>
                <select name="country" onChange={handleChange} value={inputData.country}>
                    <option value="Thailand">Thailand</option>
                </select>
                {errorData.country && <p className="error">{errorData.country}</p>}
                </div>
                <div className="input-select">
                <p>Province</p>
                <select name="province" onChange={handleChange} value={inputData.province}>
                    <option value="">Select Province</option>
                    {provinces.map((province, index) => (
                        <option key={index} value={province}>{province}</option>
                    ))}
                </select>
                {errorData.province && <p className="error">{errorData.province}</p>}
                </div>  
                <div className="input-select">
                <p>District</p> 
                <select name="district" onChange={handleChange} value={inputData.district}>
                    <option value="">Select District</option>
                    {districts.map((district) => {
                        if (district.province === inputData.province) {
                            return district.district.map((districtName, index) => (
                                <option key={index} value={districtName}>{districtName}</option>
                            ))
                        }
                    })}
                </select>
                {errorData.district && <p className="error">{errorData.district}</p>}
                </div>
                <div className="input-group">
                    <div className="input-field">
                        <i><FontAwesomeIcon icon={faMailBulk} /></i>
                        <input type="text" name="zipCode" placeholder="Zip Code" onChange={handleChange} value={inputData.zipCode} />
                    </div>
                    {errorData.zipCode && <p className="error">{errorData.zipCode}</p>}
                </div>
                <div className="button-group">
                    <button type="button" onClick={onSubmit}>Submit</button>
                    <button type="button" onClick={onBack}>Back</button>
                </div>
        </>
    )
};

const Register = () => {
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [step, setStep] = useState<number>(1);
    const [errors, setErrors] = useState<FormError>({});
    const [SignupState, setSignupState] = useState<SignupState>({
        fullname: 'Bob Maley',
        email: 'john.doe@mail.com',
        password: '$Admin1234',
        confirmPassword: '$Admin1234',
        gender: 'Male',
        idCard: '1234567890123',
        dateOfBirth: {
            day: 1,
            month: 0,
            year: 1998,
        },
        phoneNumber: '0123456789',
        address: 'BKK, TH',
        country: 'Thailand',
        province: 'Bangkok',
        district: 'Ladprao',
        zipCode: '12345',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setSignupState({ ...SignupState, [name]: value });
      };

    const handleChangeBirthDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setSignupState({ ...SignupState, dateOfBirth: { ...SignupState.dateOfBirth, [name]: value } });
    };

    const handleNext = () => {
        const result = handleFirstStepInput();
        if (result.flag) {
            setStep(2);
        }
        else {
            console.log('result.errors', result.errors)
            setErrors(result.errors);
            if (Object.keys(result.errors).length > 0) {
                console.log('Errors');
                console.log(errors);
            }
        }
        
    };
    const handleBack = () => {
        setStep(1);
    }
    const handleSubmit = () => {
        const result = handleSecondStepInput();
        if (result.flag) {
            console.log(SignupState);
            setSubmitted(true);
            alert('Sign up successfully');
        }
        else {
            setErrors(result.errors);
            if (Object.keys(result.errors).length > 0) {
                console.log('Errors');
            }
        }
    }

    const handleFirstStepInput = () => {
        const { fullname, email, password, confirmPassword } = SignupState;
        const fistSignUpStepErrors: FormError = handleFirstSignupValidation(fullname, email, password, confirmPassword);
        setErrors(fistSignUpStepErrors);
        if (Object.keys(fistSignUpStepErrors).length === 0) {
            const res: { errors: FormError, flag: boolean } = {
                errors: {},
                flag: true
            };
            return res;
        }
        else{
            const res: { errors: FormError, flag: boolean } = {
                errors: fistSignUpStepErrors,
                flag: false
            }
            return res;
        }
    }

    const handleSecondStepInput = () => {
        const { idCard, phoneNumber, address, country, province, district, zipCode, gender, dateOfBirth } = SignupState;
        const secondSignUpStepErrors: FormError = handleSecondSignupValidation(idCard, phoneNumber, address, country, province, district, zipCode, gender, dateOfBirth);
        setErrors(secondSignUpStepErrors);
        if (Object.keys(secondSignUpStepErrors).length === 0) {
            const res: { errors: FormError, flag: boolean } = {
                errors: {},
                flag: true
            };
            return res;
        }
        else{
            const res: { errors: FormError, flag: boolean } = {
                errors: secondSignUpStepErrors,
                flag: false
            }
            return res;
        }
    }

    const navigate = useNavigate();
    const [redirect, setRedirect] = useState<boolean>(false);

    if (redirect) {
        navigate('/', { replace: true });
    }

    const handleRegister = async () => {
        try {
            const { dateOfBirth,...restDate } = SignupState;
            const { year, month, day } = dateOfBirth;
            const dateOBJ = new Date(Date.UTC(year, month, day));
            const formData = {...restDate, dateOfBirth: dateOBJ };
            let token;
            let user_id;
        
            const userData = {...formData, username: formData.fullname, email: formData.email, password: formData.password };
        
            await axios.post("http://localhost:3001/users/register", JSON.stringify(userData), {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            }).then((res) => {
                // console.log(res);
                token = res.data.access_token;
                const user = jwtDecode(token);
                user_id = user.sub;
                localStorage.setItem("access_token",token);
            });

            const userInfoData = {
                date_of_birth: dateOBJ,
                id_card: formData.idCard,
                gender: formData.gender,
                phone_no: formData.phoneNumber,
                address: formData.address,
                country: formData.country,
                province: formData.province,
                district: formData.district,
                postal_code: formData.zipCode,
                user_id: user_id
            };
            
            await axios.post("http://localhost:3001/users/user_info", JSON.stringify(userInfoData), {
                withCredentials: true,
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            setRedirect(true);
        } catch (err) {
            console.error('error', err);
        }
    };

    useEffect(() => {
        console.log('submitted', submitted);

        if (submitted) {
            handleRegister();
        }

        return () => {
            setSubmitted(false);
        }

    }, [submitted]);
    
    useEffect(() => {
        const maxDayInMonth = getDaysInMonth(SignupState.dateOfBirth.month, SignupState.dateOfBirth.year);
        if (SignupState.dateOfBirth.day > maxDayInMonth) {
            setSignupState({ ...SignupState, dateOfBirth: { ...SignupState.dateOfBirth, day: maxDayInMonth } });
        }
    }, [SignupState.dateOfBirth.month, SignupState.dateOfBirth.year]);

    return (
        <>
            <div className="signup-container">
                <div className="SignUp">
                    <h1>Create an account</h1>
                    <form>
                        {step === 1 && <FirstSignUpStep onNext={handleNext} handleChange={handleChange} inputData={SignupState} errorData={errors} />}
                        {step === 2 && <SecondSignUpStep onBack={handleBack} onSubmit={handleSubmit} handleChange={handleChange} handleChangeBirthDate={handleChangeBirthDate} inputData={SignupState} errorData={errors} />}
                        <p className="link-group">Already have an account? <Link to="/signin">Sign In</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
};

export default Register;