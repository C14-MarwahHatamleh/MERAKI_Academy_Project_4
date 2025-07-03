import "./style.css";

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { userContext } from "../../App";
import { Button } from "antd";

const Profile = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({});
  const { token } = useContext(userContext);
  const { id } = useParams();

  console.log("userInfoProfile", info);

  const getUserInfo = () => {
    axios
      .get(`http://localhost:5000/users/byId/${id}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("res", res);
        setInfo(res.data.user[0]);
        // localStorage.setItem("User", JSON.stringify(res.data.user));
        // console.log([...posts, res.data.jobs])
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <div className="main">
        <div class="profile-card">
          {/* <div class="image">
            <img src="" alt="" class="profile-pic" />
          </div> */}
          <div class="data">
            <h2>{info.firstName + " " + info.lastName}</h2>
            <span></span>
          </div>
          <div class="row">
            <div class="info">
              <h4>Email</h4>
              {info.email}
            </div>
            <div class="info">
              <h4>Country</h4>
              {info.country}
            </div>
            <div class="info">
              <h4>Age</h4>
              {info.age}
            </div>
            <button
              type="button"
              class="btn btn-light btn-md"
              onClick={(e) => {
                navigate(`/${id}/deactivatedUser`);
              }}
            >
              Deactivated User
            </button>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default Profile;
