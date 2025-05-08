import "./style.css";
import React from "react";

export const Register = () => {
  return (
    <>
      <div className="containerRegister">
        <div className="introRegister">
          <h2>Welcome</h2>
        </div>
        <div className="paraRegister">
          <p>test</p>
        </div>
        <div className="register">
          <div className="labels">
            <label>FirstName</label>
            <label>LastName</label>
            <label>Email</label>
            <label>Password</label>
            <label>Age</label>
            <label>Country</label>
          </div>
          <div className="inputs">
            <input className="firstName" type="text" placeholder="FirstName" />
            <input className="lastName" type="text" placeholder="LastName" />
            <input className="email" type="email" placeholder="Email" />
            <input className="password" type="password" placeholder="Password" />
            <input className="age" type="number" placeholder="Age" />
            <input className="country" type="text" placeholder="Country" />
          </div>
        </div>
        {/* <div className="features">
          <p>test</p>
        </div> */}
      </div>
    </>
  );
};
