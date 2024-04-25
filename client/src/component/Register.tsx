import React, { useState, useEffect } from 'react';
import { SignupState, FormError} from '../constants';
import { handleFirstSignupValidation, handleSecondSignupValidation } from './InputValidation';
interface FirstSignUpStepProps {
    inputData: SignupState;
    onNext: () => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const FirstSignUpStep: React.FC<FirstSignUpStepProps> = ({ onNext, handleChange, inputData }) => {
    
    return (
        <>
            <form style={{ display: 'flex', flexDirection: 'column' }}>
                <input type="text" name="fullname" placeholder="Fullname" onChange={handleChange} value={inputData.fullname} />
                <input type="email" name="email" placeholder="Email"onChange={handleChange} value={inputData.email} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} value={inputData.password} />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} value={inputData.confirmPassword} />
                <button type="button" onClick={onNext}>Next</button>
            </form>
        </>
    )
};

interface SecondSignUpStepProps {
    inputData: SignupState;
    onBack: () => void;
    onSubmit: () => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const SecondSignUpStep: React.FC<SecondSignUpStepProps> = ({ onBack, onSubmit, handleChange, inputData }) => {
    return (
        <>
            <form style={{ display: 'flex', flexDirection: 'column' }}>
                <input type="text" name="idCard" placeholder="ID Card" onChange={handleChange} value={inputData.idCard} />
                <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} value={inputData.phoneNumber} />
                <input type="text" name="address" placeholder="Address" onChange={handleChange} value={inputData.address} />
                <input type="text" name="country" placeholder="Country" onChange={handleChange} value={inputData.country} />
                <input type="text" name="province" placeholder="Province" onChange={handleChange} value={inputData.province} />
                <input type="text" name="district" placeholder="District" onChange={handleChange} value={inputData.district} />
                <input type="text" name="zipCode" placeholder="Zip Code" onChange={handleChange} value={inputData.zipCode} />
                <button type="button" onClick={onBack}>Back</button>
                <button type="button" onClick={onSubmit}>Sign Up</button>
            </form>
        </>
    )
};

const Register = () => {
    const [buttonText, setButtonText] = useState<string>('Next');
    const [step, setStep] = useState<number>(1);
    const [errors, setErrors] = useState<FormError>({});
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
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setSignupState({ ...SignupState, [name]: value });
      };

    const handleNext = () => {
        const result = handleFirstStepInput();
        if (result.flag) {
            setStep(2);
            setButtonText('SIGN UP');
        }
        else {
            setErrors(result.errors);
            if (Object.keys(result.errors).length > 0) {
                console.log('Errors');
            }
        }
        
    };
    const handleBack = () => {
        setStep(1);
        setButtonText('Next');
    }
    const handleSubmit = () => {
        const result = handleSecondStepInput();
        if (result.flag) {
            console.log(SignupState);
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

    return (
        <>
            <div className="SignUp">
                {step === 1 && <FirstSignUpStep onNext={handleNext} handleChange={handleChange} inputData={SignupState} />}
                {step === 2 && <SecondSignUpStep onBack={handleBack} onSubmit={handleSubmit} handleChange={handleChange} inputData={SignupState} />}
            </div>
        </>
    )
};

export default Register;