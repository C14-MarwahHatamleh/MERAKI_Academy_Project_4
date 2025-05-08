import { useNavigate } from "react-router-dom";
import "./style.css";
import React, { useState } from "react";
import axios from "axios";

export const Register = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
console.log(msg)
  const Register = () => {
    axios
      .post("http://localhost:5000/users/register", userInfo)
      .then((res) => {
        setMsg("Registered Successfully");
        navigate(`/home`);
        setSuccess(true);

      })
      .catch((err) => {
        setSuccess(false);
        setMsg("Can't register please check the data again");
      });
  };

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
            <input
              onChange={(e) => {
                setUserInfo({ ...userInfo, firstName: e.target.value });
              }}
              className="firstName"
              type="text"
              placeholder="FirstName"
            />
            <input
              onChange={(e) => {
                setUserInfo({ ...userInfo, lastName: e.target.value });
              }}
              className="lastName"
              type="text"
              placeholder="LastName"
            />
            <input
              onChange={(e) => {
                setUserInfo({ ...userInfo, email: e.target.value });
              }}
              className="email"
              type="email"
              placeholder="Email"
            />
            <input
              onChange={(e) => {
                setUserInfo({ ...userInfo, password: e.target.value });
              }}
              className="password"
              type="password"
              placeholder="Password"
            />
            <input
              onChange={(e) => {
                setUserInfo({ ...userInfo, age: e.target.value });
              }}
              className="age"
              type="text"
              placeholder="Age"
            />
            <input
              onChange={(e) => {
                setUserInfo({ ...userInfo, country: e.target.value });
              }}
              className="country"
              type="text"
              placeholder="Country"
            />
          </div>
        </div>
        <div className="btnSubmit">
          <button className="submit" onClick={Register}>
            Submit
          </button>
        </div>
        
        {msg && <div className= {success? "success" : "failed"}> <p>{msg}</p></div>}

        {/* <div className="features">
          <p>test</p>
        </div> */}
      </div>
    </>
  );
};
