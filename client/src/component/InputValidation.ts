import { DateOfBirth, months, genders, FormError } from '../constants';

const validationEmail = (email: string): string => {
  const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email) ? '' : 'Invalid email address';
};

const validationPassword = (password: string): string => {
  const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password) ? '' : 'Password minimum 8 characters and at least one special character';
};

const validationConfirmPassword = (password: string, confirmPassword: string): string => {
  return password.trim() === confirmPassword.trim() ? '' : 'Password does not match';
};

const validationIDCard = (idCard: string): string => {
  const idCardRegex: RegExp = /^[0-9]{13}$/;
  return idCardRegex.test(idCard) ? '' : 'Invalid ID Card';
};

const validationPhoneNumber = (phoneNumber: string): string => {
  const phoneNumberRegex: RegExp = /^0[0-9]{9}$/;
  return phoneNumberRegex.test(phoneNumber) ? '' : 'Invalid phone number';
};

const validationAddress = (address: string): string => {
  return address.trim().length > 0 ? '' : 'Address is required';
};

const validationZipCode = (zipCode: string): string => {
  const zipCodeRegex = /^[0-9]{5}$/;
  return zipCodeRegex.test(zipCode) ? '' : 'Invalid zip code';
};

const validationProvince = (province: string): string => {
  return province.trim().length > 0 ? '' : 'Province is required';
};

const validationDistrict = (district: string): string => {
  return district.trim().length > 0 ? '' : 'District is required';
};

const validationCountry = (country: string): string => {
  return country.trim().length > 0 ? '' : 'Country is required';
};

const validationGender = (gender: string): string => {
  if (genders.includes(gender)) {
    return '';
  } else {
    return 'Please select gender';
  }
};

const validationDateOfBirth = (dateOfBirth: DateOfBirth): string => {
  const { day, month, year } = dateOfBirth;
  if ((day >= 1 && day <= 31) && (months.indexOf(month) !== -1) && (year >= 1900 && year <= 2021)) {
    return '';
  }
  return 'Invalid date of birth';
};

const validationFullname = (fullname: string): string => {
  const name = fullname.trim().split(' ');
  if (name.length === 2) {
    return '';
  }
  else {
    return 'Fullname must contain first name and last name';
  }
};

export const handleFirstSignupValidation = (fullname: string, email: string, password: string, confirmPassword: string): FormError => {
  const errors: FormError = {};

  const fullnameError: string = validationFullname(fullname);
  const emailError: string = validationEmail(email);
  const passwordError: string = validationPassword(password);
  const confirmPasswordError: string = validationConfirmPassword(password.trim(), confirmPassword.trim());
  if (fullnameError) {
    errors.fullname = fullnameError;
  };
  if (emailError) {
    errors.email = emailError;
  };
  if (passwordError) {
    errors.password = passwordError;
  };

  if (Object.keys(errors).length === 0) {
    if (confirmPasswordError) {
      errors.confirmPassword = confirmPasswordError;
    }
  }
  return errors;

}

// idCard, phoneNumber, address, country, province, district, zipCode, gender
export const handleSecondSignupValidation = (idCard: string, phoneNumber: string, address: string, country: string,
  province: string, district: string, zipCode: string, gender: string, dateOfBirth: DateOfBirth): FormError => {
  const errors: FormError = {};
  const idCardError: string = validationIDCard(idCard);
  // const genderError: string = validationGender(gender);
  // const dateOfBirthError: string = validationDateOfBirth(dateOfBirth);
  const phoneNumberError: string = validationPhoneNumber(phoneNumber);
  const addressError: string = validationAddress(address);
  // const countryError: string = validationCountry(country);
  // const provinceError: string = validationProvince(province);
  // const districtError: string = validationDistrict(district);
  const zipCodeError: string = validationZipCode(zipCode);

  if (idCardError) {
    errors.idCard = idCardError;
  }
  // if (genderError) {
  //   errors.gender = genderError;
  // }
  // if (dateOfBirthError) {
  //   errors.dateOfBirth = dateOfBirthError;
  // }
  if (phoneNumberError) {
    errors.phoneNumber = phoneNumberError;
  }
  if (addressError) {
    errors.address = addressError;
  }
  // if (countryError) {
  //   errors.country = countryError;
  // }
  // if (provinceError) {
  //   errors.province = provinceError;
  // }
  // if (districtError) {
  //   errors.district = districtError;
  // }
  if (zipCodeError) {
    errors.zipCode = zipCodeError;
  }
  return errors;
}