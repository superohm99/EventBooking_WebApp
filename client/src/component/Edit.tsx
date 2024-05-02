import React, { useState, useEffect } from "react";
import "../style/Edit.css";
import Profile from "./Profile";
import Navbar from "./Navbar";
import { DateOfBirth, range, getDaysInMonth, months, genders, provinces, districts } from "../constants";

interface ProfileState{
  email: string;
  username: string;
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
}

function Edit() {

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileState>({
    email: "",
    username: "",
  });

  const [userInfo, setUserinfo] = useState<EditState>({
    username: "",
    gender: "",
    date_of_birth: {
      day: '',
      month: '',
      year: ''
    },
    id_card: "",
    phone_no: "",
    address: "",
    country: "",
    province: "",
    district: "",
    postal_code: "",
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
        setProfile({
          email: data.user.email,
          username: data.user.username,
        });
        setUserinfo({
          ...userInfo,
          username: data.user.username,
          gender:data.gender,
          date_of_birth: {
            day: new Date(data.date_of_birth).getDate().toString(),
            month: new Date(data.date_of_birth).getMonth().toString(),
            year: new Date(data.date_of_birth).getFullYear().toString(),
          },
          id_card: data.id_card,
          phone_no: data.phone_no,
          address: data.address,
          country: data.country,
          province: data.province,
          district: data.district,
          postal_code: data.postal_code,
        });
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
        //
      } else {
        console.error("Failed to update user info:", data);
      }
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUserinfo({ ...userInfo, [name]: value });
  };

  const handleBirthDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUserinfo({
      ...userInfo,
      date_of_birth: {
        ...userInfo.date_of_birth,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setIsEdit(true);
  };

  useEffect(() => {
    if (isEdit) {
      const { day, month, year } = userInfo.date_of_birth;
      console.log(`|${day}|${month}|${year}|`)
      const dateOBJ = new Date(Date.UTC(parseInt(year), parseInt(month), parseInt(day)));
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
    });
    setProfile({...profile, username: userInfo.username});
    setUserinfo({...userInfo, date_of_birth: {day: day, month: month, year: year}});
    console.log('User_info update:',userInfo);
    }

    return () => {
      setIsEdit(false);
    };

  }, [isEdit]);

  return (
    <>
      <Navbar />
      <div className="box-container">
        <div className="edit-container">
          <Profile username={profile.username} email={profile.email} />
          <div className="content">
            <form>
              <div className="input-vertical">
                <p>Name</p>
                <input
                  name="username"
                  type="text"
                  value={userInfo.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-vertical">
                <p>Gender</p>
                <select name="gender" value={userInfo.gender} onChange={handleInputChange}>
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
                  name="day"
                  value={userInfo.date_of_birth.day}
                  onChange={handleBirthDateChange}
                >
                  <option value="">Day</option>
                  {range(1, getDaysInMonth(userInfo.date_of_birth.month, userInfo.date_of_birth.year)).map((day, index) => (
                    <option key={index} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <select
                  name="month"
                  value={userInfo.date_of_birth.month}
                  onChange={handleBirthDateChange}
                >
                  <option value="">Month</option>
                  {months.map((month, index) => (
                    <option key={index} value={index}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  name="year"
                  value={userInfo.date_of_birth.year}
                  onChange={handleBirthDateChange}
                >
                  <option value="">year</option>
                  {range(new Date().getFullYear() - 100, new Date().getFullYear()).map((year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                </div>
              </div>
              <div className="input-vertical">
                <p>ID Card</p>
                <input
                 name="id_card"
                  type="text"
                  value={userInfo.id_card}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-vertical">
                <p>Phone Number</p>
                <input
                  name="phone_no"
                  type="text"
                  value={userInfo.phone_no}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-vertical">
                <p>Home No, Room No, Aparment/Village Name, Sub-District</p>
                <textarea
                 name="address"
                  value={userInfo.address}
                  onChange={handleInputChange}
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
                 name="province"
                  value={userInfo.province}
                  onChange={handleInputChange}
                >
                  <option value="">Province</option>
                  {provinces.map((province, index) => (
                    <option key={index} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-horizontal">
                <p>District</p>
                <select
                 name="district"
                  value={userInfo.district}
                  onChange={handleInputChange}
                >
                  <option value="">District</option>
                  {districts.map((district) => {
                    if (district.province === userInfo.province) {
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
                  name="postal_code"
                  type="text"
                  value={userInfo.postal_code}
                  onChange={handleInputChange}
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
