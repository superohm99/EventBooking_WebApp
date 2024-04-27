import React, { useState, useEffect } from "react";
import "../style/Edit.css";
import Profile from "./Profile";
import Navbar from "./Navbar";

interface DateOfBirth {
  day: number;
  month: number;
  year: number;
}

interface EditState {
  name: string;
  gender: string;
  dateOfBirth: DateOfBirth;
  idCard: string;
  phoneNumber: string;
  address: string;
  country: string;
  province: string;
  district: string;
  zipCode: string;
  error: string | null;
}

const genders = ["Male", "Female", "Other"];

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
  "December",
];

const years = Array.from({ length: 50 }, (_, i) => 1970 + i);

const provinces = [
  { label: "Bangkok", value: 1 },
  { label: "Chiang Mai", value: 2 },
  { label: "Phuket", value: 3 },
];

const districts = [
  {
    province: "Bangkok",
    district: ["Ladprao", "Sathorn", "Bangrak", "Ladkrabang"],
  },
  { province: "Chiang Mai", district: ["Muang", "Sarapee", "Doi Saket"] },
  { province: "Phuket", district: ["Muang", "Kathu", "Thalang"] },
];

function Edit() {
  const [EditState, setEditState] = useState<EditState>({
    name: "Ben Tennyson",
    gender: "Male",
    dateOfBirth: {
      day: 24,
      month: 2,
      year: 2000,
    },
    idCard: "1010112346",
    phoneNumber: "0987654321",
    address: "911/2 gaygee1",
    country: "Thailand",
    province: "Bangkok",
    district: "Ladkrabang",
    zipCode: "99999",
    error: null,
  });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditState({ ...EditState, name: event.target.value });
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEditState({ ...EditState, gender: event.target.value });
  };

  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEditState({
      ...EditState,
      dateOfBirth: {
        ...EditState.dateOfBirth,
        day: parseInt(event.target.value),
      },
    });
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEditState({
      ...EditState,
      dateOfBirth: {
        ...EditState.dateOfBirth,
        month: parseInt(event.target.value),
      },
    });
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEditState({
      ...EditState,
      dateOfBirth: {
        ...EditState.dateOfBirth,
        year: parseInt(event.target.value),
      },
    });
  };

  const handleIdCardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditState({ ...EditState, idCard: event.target.value });
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditState({ ...EditState, phoneNumber: event.target.value });
  };

  const handleAddressChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditState({ ...EditState, address: event.target.value });
  };

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEditState({ ...EditState, province: event.target.value });
  };
  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEditState({ ...EditState, district: event.target.value });
  };

  const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditState({ ...EditState, zipCode: event.target.value });
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // send "values" to database
    console.log(EditState);
  };

  return (
    <>
      <Navbar />
      <div className="box-container">
        <div className="edit-container">
          <Profile />
          <div className="content">
            <h1 className="heading">Edit Profile</h1>
            <form>
              <div className="input-vertical">
                <p>Name</p>
                <input
                  type="text"
                  value={EditState.name}
                  onChange={handleNameChange}
                />
              </div>
              <div className="input-vertical">
                <p>Gender</p>
                <select value={EditState.gender} onChange={handleGenderChange}>
                  <option value="">Gender</option>
                  {genders.map((gender, index) => (
                    <option key={index} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-vertical">
                <p>Date of Birth</p>
                <select
                  value={EditState.dateOfBirth.day}
                  onChange={handleDayChange}
                >
                  <option value="">Day</option>
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <select
                  value={EditState.dateOfBirth.month}
                  onChange={handleMonthChange}
                >
                  <option value="">Month</option>
                  {months.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  value={EditState.dateOfBirth.year}
                  onChange={handleYearChange}
                >
                  <option value="">Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-vertical">
                <p>ID Card</p>
                <input
                  type="text"
                  value={EditState.idCard}
                  onChange={handleIdCardChange}
                />
              </div>
              <div className="input-vertical">
                <p>Phone Number</p>
                <input
                  type="text"
                  value={EditState.phoneNumber}
                  onChange={handlePhoneChange}
                />
              </div>
              <div className="input-vertical">
                <p>Home No, Room No, Aparment/Village Name, Sub-District</p>
                <textarea
                  value={EditState.address}
                  onChange={handleAddressChange}
                ></textarea>
              </div>
              <div className="input-horizontal">
                <p>Country</p>
                <select value={EditState.country}>
                  <option value={EditState.country}>{EditState.country}</option>
                </select>
              </div>
              <div className="input-horizontal">
                <p>Province</p>
                <select
                  value={EditState.province}
                  onChange={handleProvinceChange}
                >
                  <option value="">Province</option>
                  {provinces.map((province) => (
                    <option key={province.value} value={province.label}>
                      {province.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-horizontal">
                <p>District</p>
                <select
                  value={EditState.district}
                  onChange={handleDistrictChange}
                >
                  <option value="">District</option>
                  {districts.map((district) => {
                    if (district.province === EditState.province) {
                      return district.district.map((district, index) => (
                        <option key={index} value={district}>
                          {district}
                        </option>
                      ));
                    }
                  })}
                </select>
              </div>
              <div className="input-vertical">
                <p>Zip Code</p>
                <input
                  type="text"
                  value={EditState.zipCode}
                  onChange={handleZipCodeChange}
                />
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="submit-btn"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Edit;