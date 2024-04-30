export interface DateOfBirth {
    day: number;
    month: number;
    year: number;
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

export const days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);

export const years: number[] = Array.from({ length: 70 }, (_, i) => 2024 - i);

export const genders: string[] = ["Male", "Female", "Other"];

export const provinces: string[] = ["Bangkok", "Chiang Mai", "Phuket"];
  
export const districts: { province: string; district: string[] }[] = [
    { province: 'Bangkok', district: ['Ladprao', 'Sathorn', 'Bangrak'] },
    { province: 'Chiang Mai', district: ['Muang', 'Sarapee', 'Doi Saket'] },
    { province: 'Phuket', district: ['Muang', 'Kathu', 'Thalang'] },
];

export const getDaysInMonth = (month: number, year: number) => {
    const newDate = new Date(year, month, 0);
    return newDate.getDate();
};

export const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);