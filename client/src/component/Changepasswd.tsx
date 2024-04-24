import React, { useState, useEffect } from "react";
import "../style/Edit.css";
import Profile from "./Profile";
import Navbar from "./Navbar";

interface ChangePassState {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  error: string | null;
}

function ChangePasswd() {
  const [ChangePassState, setChangePassState] = useState<ChangePassState>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    error: null,
  });

  const handleOldPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChangePassState({ ...ChangePassState, oldPassword: event.target.value });
  };

  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChangePassState({ ...ChangePassState, newPassword: event.target.value });
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChangePassState({
      ...ChangePassState,
      confirmPassword: event.target.value,
    });
  };

  const comparePassword = (
    newPassword: string,
    confirmPassword: string
  ): boolean => {
    return newPassword === confirmPassword;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      comparePassword(
        ChangePassState.newPassword,
        ChangePassState.confirmPassword
      )
    ) {
      // send "values" to database
      console.log(ChangePassState);
    } else {
      setChangePassState({ ...ChangePassState, error: "**Password not match" });
    }
  };

  return (
    <>
    <Navbar/>
      <div className="box-container">
        <Profile />
        <div className="content">
          <h1 className="heading">Change Password</h1>
          <form>
            <div className="input-vertical">
              <p>Old Password</p>
              <input
                type="password"
                value={ChangePassState.oldPassword}
                onChange={handleOldPasswordChange}
              />
            </div>
            <div className="input-vertical">
              <p>New Password</p>
              <input
                type="password"
                value={ChangePassState.newPassword}
                onChange={handleNewPasswordChange}
              />
            </div>
            <div className="input-vertical">
              <p>Confirm Password</p>
              <input
                type="password"
                value={ChangePassState.confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
            <button type="submit" onClick={handleSubmit} className="submit-btn">
              Save Changes
            </button>
            {ChangePassState.error && (
              <p className="error">{ChangePassState.error}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangePasswd;