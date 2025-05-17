import { useNavigate } from "react-router-dom";
import "./style.css";
import React, { useContext, useState } from "react";
import axios from "axios";
import { userContext } from "../../../App";

export const Register = () => {
  const navigate = useNavigate();
  const [userInfoLogin, setUserInfoLogin] = useState({});
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const { setToken, setUID, setRole } = useContext(userContext);
  const { userInfo, setUserInfo } = useContext(userContext);

  console.log(userInfo, userInfoLogin);

  const Login = () => {
    axios
      .post("http://localhost:5000/users/login", userInfoLogin)
      .then((res) => {
        console.log(res);
        setMsg("Login Successfully");
           setTimeout(() => {
            setMsg("");
           }, 3000);
        localStorage.setItem("token", res.data.token);
        const token_decoded = JSON.parse(atob(res.data.token.split(".")[1]));
        localStorage.setItem("UID", token_decoded.userID);
        localStorage.setItem("role", token_decoded.role.role);
        setToken(res.data.token);
        setUID(token_decoded.userID);
        setRole(token_decoded.role.role);
        navigate(`/home`);
        setSuccess(true);
      })
      .catch((err) => {
        setSuccess(false);
        setMsg("Can't login please check email or password");
        setTimeout(() => {
          setMsg("");
        }, 3000);
      });
  };

  const Register = () => {
    axios
      .post("http://localhost:5000/users/register", userInfo)
      .then((res) => {
        setMsg("Registered Successfully");
        setTimeout(() => {
            setMsg("");
        }, 3000);
        localStorage.setItem("token", res.data.token);
        const token_decoded = JSON.parse(atob(res.data.token.split(".")[1]));
        localStorage.setItem("UID", token_decoded.userID);
        localStorage.setItem("role", token_decoded.role.role);
        setToken(res.data.token);
        setUID(token_decoded.userID);
        setRole(token_decoded.role.role);
        navigate(`/home`);
        setSuccess(true);
      })
      .catch((err) => {
        setSuccess(false);
        setMsg("Can't register please check the fields again");
        setTimeout(() => {
          setMsg("");
        }, 3000);
      });

  };

  return (
    <>
      <div class="wrapper">
        <div class="card-switch">
          <label class="switch">
            <input class="toggle" type="checkbox" />
            <span class="slider"></span>
            <span class="card-side"></span>
            <div class="flip-card__inner">
              <div class="flip-card__front">
                <div class="title">Log in</div>
                <div>
                  <input
                    onChange={(e) => {
                      setUserInfoLogin({
                        ...userInfoLogin,
                        email: e.target.value,
                      });
                    }}
                    type="email"
                    placeholder="Email"
                    name="email"
                    class="flip-card__input"
                  />
                  <input
                    onChange={(e) => {
                      setUserInfoLogin({
                        ...userInfoLogin,
                        password: e.target.value,
                      });
                    }}
                    type="password"
                    placeholder="Password"
                    name="password"
                    class="flip-card__input"
                  />
                  <button class="flip-card__btn" onClick={Login}>
                    Submit!
                  </button>
                  {msg && (
                    <div className={success ? "success" : "failed"}>
                      {" "}
                      <p className="msg">{msg}</p>
                    </div>
                  )}
                </div>
              </div>
              <div class="flip-card__back">
                <div class="title">Sign up</div>
                <div class="flip-card__form">
                  <input
                    onChange={(e) => {
                      console.log(e.target.value);
                      setUserInfo({ ...userInfo, firstName: e.target.value });
                    }}
                    type="text"
                    name="firstName"
                    placeholder="FirstName"
                    class="flip-card__input"
                  />
                  <input
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, lastName: e.target.value });
                    }}
                    type="text"
                    name="lastName"
                    placeholder="LastName"
                    class="flip-card__input"
                  />
                  <input
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, email: e.target.value });
                    }}
                    type="email"
                    placeholder="Email"
                    name="email"
                    class="flip-card__input"
                  />
                  <input
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, password: e.target.value });
                    }}
                    type="password"
                    placeholder="Password"
                    name="password"
                    class="flip-card__input"
                  />
                  <input
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, age: e.target.value });
                    }}
                    type="text"
                    placeholder="Age"
                    name="age"
                    class="flip-card__input"
                  />
                  <input
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, country: e.target.value });
                    }}
                    type="text"
                    placeholder="Country"
                    name="country"
                    class="flip-card__input"
                  />
                  <button class="flip-card__btn" onClick={Register}>
                    Confirm!
                  </button>
                  <button class="google_singIn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMidYMid"
                      viewBox="0 0 256 262"
                    >
                      <path
                        fill="#4285F4"
                        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                      ></path>
                      <path
                        fill="#34A853"
                        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                      ></path>
                      <path
                        fill="#FBBC05"
                        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                      ></path>
                      <path
                        fill="#EB4335"
                        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                      ></path>
                    </svg>
                    Continue with Google
                  </button>
                  {msg && (
                    <div className={success ? "success" : "failed"}>
                      {" "}
                      <p className="msg">{msg}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
      
    </>
    
  );
};
