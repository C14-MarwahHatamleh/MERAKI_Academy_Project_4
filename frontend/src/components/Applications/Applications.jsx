import { useParams } from "react-router-dom";
import "./style.css";

import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import moment from "moment";
import { useContext } from "react";
import { userContext } from "../../App";

const Applications = () => {
  const { id } = useParams();
  const [userApplications, setUserApplications] = useState([]);
  const { token } = useContext(userContext);






  const getUserApplications = () => {
    axios
      .get(`http://localhost:5000/jobs/${id}/applications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("res", res.data.UserApplications);
        setUserApplications(res.data.UserApplications);
        // console.log([...posts, res.data.jobs])
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUserApplications();
  }, []);

  return (
    <>
      <div>
        <h2 className="my-apps"> MY APPLICATIONS</h2>
      </div>
      <div className="applications">
        <div className="cards-application">
          {userApplications?.map((ele, i) => {
            console.log("searchResults", ele);
            return (
              <div className="cards-app" key={i}>
                <div className="card-body">
                  <p className="intro"> Application {i + 1}</p>
                  <div className="class-email">
                    <p lassName="card-email cardDiv"> Email :{ele.Email}</p>
                  </div>
                  <div className="class-phone">
                    <p className="card-typeOfWork cardDiv">
                      Phone : {ele.Phone}
                    </p>
                  </div>
                  <div className="class-title">
                    <p className="card-title cardDiv">Title : {ele.title}</p>
                  </div>
                  <div className="class-name">
                    {" "}
                    <p className="card-name cardDiv">
                      {" "}
                      Name :{ele.firstName + " " + ele.lastName}
                    </p>
                  </div>
                  <div className="class-salary">
                    <p className="card-salary cardDiv">
                      {" "}
                      Salary : {ele.salary}
                    </p>
                  </div>
                  <div className=" class-experience">
                    <p className="card-experience cardDiv">
                      {" "}
                      Years Of Experiences : {ele.yearsOfExperiences}
                    </p>
                  </div>
                  <div className="countryDiv">
                    <p className="card-country cardDiv">
                      Country : {ele.country}
                    </p>
                  </div>
                  <div className="class-applyDate">
                    <p className="card-applyDate cardDiv">
                      Apply Date :{" "}
                      {moment(ele?.applyDate).format("YYYY-MM-DD") ?? " "}
                    </p>
                  </div>
                  <div className="class-cvUrl">
                    <p className="card-cv card">
                      CV : <a href={`${ele.cvURL}`}>{ele.cvURL}</a>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
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
      </div>
    </>
  );
};

export default Applications;
