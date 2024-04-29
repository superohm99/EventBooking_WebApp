export interface DateOfBirth {
    day: number;
    month: string;
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

export const genders: string[] = ["Male", "Female", "Other"];