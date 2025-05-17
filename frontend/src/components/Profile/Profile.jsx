import "./style.css";

import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { userContext } from "../../App";

const Profile = () => {
  const [userInfoProfile, setUserInfoProfile] = useState([]);
  const { token } = useContext(userContext);
  const { id } = useParams();
  console.log(userInfoProfile);
  const getUser = () => {
    axios
      .get(`http://localhost:5000/users/byId/${id}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("res", res.data.user);
        setUserInfoProfile(res.data.user);
        localStorage.setItem("User", JSON.stringify(res.data.user));
        // console.log([...posts, res.data.jobs])
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let LS = JSON.parse(localStorage.getItem("User"));

  getUser();

  return (
    <>
      <div className="main">
        <div class="profile-card">
          {/* <div class="image">
            <img src="" alt="" class="profile-pic" />
          </div> */}
          <div class="data">
            <h2>{LS[0]["firstName"] + " " + LS[0]["lastName"]}</h2>
            <span></span>
          </div>
          <div class="row">
            <div class="info">
              <h4>Email</h4>
              {LS[0]["email"]}
            </div>
            <div class="info">
              <h4>Country</h4>
              {LS[0]["country"]}
            </div>
            <div class="info">
              <h4>Age</h4>
              {LS[0]["age"]}
            </div>
          </div>
        </div>
      </div>

      <div class="footer-dark">
        <footer>
          <div class="container">
            <div class="row">
              <div class="col-sm-6 col-md-3 item">
                <h3>Services</h3>
                <ul>
                  <li>
                    <a href="#">Web design</a>
                  </li>
                  <li>
                    <a href="#">Development</a>
                  </li>
                  <li>
                    <a href="#">Hosting</a>
                  </li>
                </ul>
              </div>
              <div class="col-sm-6 col-md-3 item">
                <h3>About</h3>
                <ul>
                  <li>
                    <a href="#">Company</a>
                  </li>
                  <li>
                    <a href="#">Team</a>
                  </li>
                  <li>
                    <a href="#">Careers</a>
                  </li>
                </ul>
              </div>
              <div class="col-md-6 item text">
                <h3>Findly LTD. Company</h3>
                <p>
                  Praesent sed lobortis mi. Suspendisse vel placerat ligula.
                  Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam
                  quis tristique lectus. Aliquam in arcu eget velit pulvinar
                  dictum vel in justo.
                </p>
              </div>
            </div>
            <p class="copyright">Findly LTD. Company © 2018</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Profile;
