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
  error: string | null;
}

interface UpdateState {
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
  { label: "Loey", value: 4 },
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


  const [userInfo, setUserinfo] = useState<EditState>({
    username: "",
    gender: "",
    date_of_birth: {
      day: 24,
      month: 2,
      year: 2000,
    },
    id_card: "",
    phone_no: "",
    address: "",
    country: "",
    province: "",
    district: "",
    postal_code: "",
    error: null,
  })
  

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    
    fetch("http://localhost:3001/users/user_info/get",
      {
        headers: {
          "Authorization": `Bearer ${token}`,
         },
      })
      .then((res) => res.json())
      .then((data) => {
        setUserinfo({
          ...userInfo,
          username: data.user.username,
          gender:data.gender,
          date_of_birth: {
            day: new Date(data.date_of_birth).getDate(),
            month: new Date(data.date_of_birth).getMonth() + 1, // Month is zero-based, so add 1
            year: new Date(data.date_of_birth).getFullYear(),
          },
          id_card: data.id_card,
          phone_no: data.phone_no,
          address: data.address,
          country: data.country,
          province: data.province,
          district: data.district,
          postal_code: data.postal_code,
        });
        console.log("Username", userInfo);
        console.log(data);
      });
  }, []);

  const updateUserInfo = async (updatedData: Partial<UpdateState>) => {
    const token = localStorage.getItem("access_token")
    try {
      const response = await fetch("http://localhost:3001/users/user_info/update_info", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
          body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      if (response.ok) {
        setUserinfo({ ...userInfo, ...data });
        console.log("User info updated successfully:", data);
      } else {
        console.error("Failed to update user info:", data);
      }
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  const [EditState, setEditState] = useState<EditState>({
    username: "Ben Tennyson",
    gender: "Male",
    date_of_birth: {
      day: 24,
      month: 2,
      year: 2000,
    },
    id_card: "1010112346",
    phone_no: "0987654321",
    address: "911/2 gaygee1",
    country: "Thailand",
    province: "Bangkok",
    district: "Ladkrabang",
    postal_code: "99999",
    error: null,
  });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setUserinfo({ ...userInfo, username: newName });
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newGender = event.target.value;
    setUserinfo({ ...userInfo, gender: newGender });
  };

  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserinfo({
      ...userInfo,
      date_of_birth: {
        ...userInfo.date_of_birth,
        day: parseInt(event.target.value),
      },
    });
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserinfo({
      ...userInfo,
      date_of_birth: {
        ...userInfo.date_of_birth,
        month: parseInt(event.target.value),
      },
    });
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserinfo({
      ...userInfo,
      date_of_birth: {
        ...userInfo.date_of_birth,
        year: parseInt(event.target.value),
      },
    });
  };

  const handleIdCardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCard = event.target.value;
    setUserinfo({ ...userInfo, id_card: newCard });
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = event.target.value;
    setUserinfo({ ...userInfo, phone_no: newPhone });
  };

  const handleAddressChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newAddress = event.target.value;
    setUserinfo({ ...userInfo, address: newAddress });
  };

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newProvince = event.target.value;
    setUserinfo({ ...userInfo, province: newProvince });
  };
  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newDistrict = event.target.value;
    setUserinfo({ ...userInfo, district: newDistrict });
  };

  const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newZipcode = event.target.value;
    setUserinfo({ ...userInfo, postal_code: newZipcode });
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // send "values" to database
    // const dateOfBirthString = formatDateOfBirth(userInfo.date_of_birth);
    // console.log('formatted_date_update', dateOfBirthString);
    // console.log('type_date_update', typeof(dateOfBirthString));

    const year = userInfo.date_of_birth.year
    const month = userInfo.date_of_birth.month -1
    const day = userInfo.date_of_birth.day

    const dateOBJ = new Date(Date.UTC(year, month, day));
    console.log('dateObj',dateOBJ)


    updateUserInfo({
      username: userInfo.username,
      gender:userInfo.gender,
      date_of_birth: dateOBJ,
      id_card: userInfo.id_card,
      phone_no: userInfo.phone_no,
      address: userInfo.address,
      country: userInfo.country,
      province: userInfo.province,
      district: userInfo.district,
      postal_code: userInfo.postal_code,
      // Add more fields as needed
    });
    console.log('User_info update:',userInfo);
    // console.log(EditState);
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
                  value={userInfo.username}
                  onChange={handleNameChange}
                />
              </div>
              <div className="input-vertical">
                <p>Gender</p>
                <select value={userInfo.gender} onChange={handleGenderChange}>
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
                <div className="dob-selectors">
                <select
                  value={userInfo.date_of_birth.day}
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
                  value={userInfo.date_of_birth.month}
                  onChange={handleMonthChange}
                >
                  <option value="">Month</option>
                  {months.map((month, index) => (
                    <option key={index} value={index+1}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  value={userInfo.date_of_birth.year}
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
              </div>
              <div className="input-vertical">
                <p>ID Card</p>
                <input
                  type="text"
                  value={userInfo.id_card}
                  onChange={handleIdCardChange}
                />
              </div>
              <div className="input-vertical">
                <p>Phone Number</p>
                <input
                  type="text"
                  value={userInfo.phone_no}
                  onChange={handlePhoneChange}
                />
              </div>
              <div className="input-vertical">
                <p>Home No, Room No, Aparment/Village Name, Sub-District</p>
                <textarea
                  value={userInfo.address}
                  onChange={handleAddressChange}
                ></textarea>
              </div>
              <div className="input-horizontal">
                <p>Country</p>
                <select value={userInfo.country}>
                  <option value={userInfo.country}>{userInfo.country}</option>
                </select>
              </div>
              <div className="input-horizontal">
                <p>Province</p>
                <select
                  value={userInfo.province}
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
                  value={userInfo.district}
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
                  value={userInfo.postal_code}
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
