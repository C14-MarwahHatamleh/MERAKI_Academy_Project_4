import "./style.css";

import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { userContext } from "../../App";
import { useContext } from "react";

export const Login = () => {
  const { setToken, setUID, setRole } = useContext(userContext);

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
 

  const Login = () => {
    axios
      .post("http://localhost:5000/users/login", userInfo)
      .then((res) => {
        console.log(res)
        setMsg("Login Successfully");
        localStorage.setItem("token" , res.data.token)
        const token_decoded = JSON.parse(atob(res.data.token.split('.')[1]));
        localStorage.setItem("UID" , token_decoded.userID)
        localStorage.setItem("role" , token_decoded.role.role)
        setToken(res.data.token)
        setUID(token_decoded.userID)
        setRole(token_decoded.role.role)
        navigate(`/home`);
        setSuccess(true);
      })
      .catch((err) => {
        setSuccess(false);
        setMsg("Can't login please check email or password");
      });
  };

  return (
    <>
      <div className="containerLogin">
        <div className="introLogin">
          <h2>Welcome</h2>
        </div>
        <div className="paraLogin">
          <p>test</p>
        </div>
        <div className="login">
          <div className="labels">
            <label>Email</label>
            <label>Password</label>
          </div>
          <div className="inputs">
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
          </div>
        </div>
        <div className="btnSubmit">
          <button className="submit" onClick={Login}>
            Login
          </button>
        </div>

        {msg && (
          <div className={success ? "success" : "failed"}>
            {" "}
            <p>{msg}</p>
          </div>
        )}

        {/* <div className="features">
          <p>test</p>
        </div> */}
      </div>
    </>
  );
};
