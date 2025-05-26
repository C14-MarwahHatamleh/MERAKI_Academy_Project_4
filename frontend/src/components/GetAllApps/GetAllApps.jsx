import React from "react";
import { useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { userContext } from "../../App";

const GetAllApps = () => {
  const [applications, setApplications] = useState([]);
  const { token } = useContext(userContext);

  const GetAllApplications = () => {
    axios
      .get("http://localhost:5000/jobs/apply", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("res", res);
        setApplications(res.data.applications);
        // console.log([...posts, res.data.jobs])
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetAllApplications();
  }, []);
  return (
    <div className="GetAllApplications">
      <div className="cards-application">
        {applications?.map((ele, i) => {
          console.log("searchResults", ele);
          return (
            <div className="cards-app" key={i}>
              <div className="card-body">
                <p className="intro"> Application {ele?.firstName ?? "N/A"}</p>
                <div className="class-email">
                  <p lassName="card-email cardDiv">
                    {" "}
                    Email :{ele?.Email ?? "N/A"}
                  </p>
                </div>
                <div className="class-phone">
                  <p className="card-typeOfWork cardDiv">
                    Phone : {ele?.Phone ?? "N/A"}
                  </p>
                </div>
                <div className="class-title">
                  <p className="card-typeOfWork cardDiv">
                    Title : {ele?.title ?? "N/A"}
                  </p>
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
                    Salary : {ele?.salary ?? "N/A"}
                  </p>
                </div>
                <div className=" class-experience">
                  <p className="card-experience cardDiv">
                    {" "}
                    Years Of Experiences : {ele?.yearsOfExperiences ?? "N/A"}
                  </p>
                </div>
                <div className="countryDiv">
                  <p className="card-country cardDiv">
                    Country : {ele?.country ?? "N/A"}
                  </p>
                </div>
                <div className="class-applyDate">
                  <p className="card-applyDate cardDiv">
                    Apply Date :{" "}
                    {moment(ele?.applyDate).format("YYYY-MM-DD") ?? "N/A"}
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
    </div>
  );
};

export default GetAllApps;
