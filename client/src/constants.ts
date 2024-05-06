export interface DateOfBirth {
    day: string;
    month: string;
    year: string;
}

export interface SignupState {
    fullname: string;
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
}

export interface EditState {
    username: string;
    gender: string;
    date_of_birth: DateOfBirth;
    id_card: string;
    phone_no: string;
    address: string;
    country: string;
    province: string;
    district: string;
    postal_code: string;
}
  
export interface UpdateState {
    username: string;
    gender: string;
    date_of_birth: Date;
    id_card: string;
    phone_no: string;
    address: string;
    country: string;
    province: string;
    district: string;
    postal_code: string;
}

export interface FormError {
    [key: string]: string;
}

export const months: string[] = [
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

export const genders: string[] = ["Male", "Female", "Other"];

export const provinces: string[] = ["Bangkok", "Chiang Mai", "Phuket", "Ubon Ratchathani"];
  
export const districts: { province: string; district: string[] }[] = [
    { province: 'Bangkok', district: ['Ladprao', 'Sathorn', 'Bangrak', 'Ladkrabang'] },
    { province: 'Chiang Mai', district: ['Muang', 'Sarapee', 'Doi Saket'] },
    { province: 'Phuket', district: ['Muang', 'Kathu', 'Thalang'] },
    { province: 'Ubon Ratchathani', district: ['Muang', 'Warin Chamrap', 'Kut Khaopun'] }
];

export const getDaysInMonth = (month: string, year: string) => {
    let monthNum: number;
    let yearNum: number;
    if (month === "") {
        monthNum = new Date().getMonth() + 1;
    } else {
        monthNum = parseInt(month) + 1;
    }
    if (year === "") {
        yearNum = new Date().getFullYear();
    } else {
        yearNum = parseInt(year);
    }
    const newDate = new Date(Date.UTC(yearNum, monthNum, 0));
    console.log('valid days: ', newDate);
    const days = newDate.getDate();
    if(isNaN(days)) return 31;
    return days;
};

export const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);