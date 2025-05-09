import "./style.css";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../../App";
import { ImBriefcase } from "react-icons/im";
import { ImLocation } from "react-icons/im";
import { ImClock } from "react-icons/im";


const Job = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [typeOfJob, setTypeOfJob] = useState("");
  const [hours, sethHours] = useState("");
  const [locationWork, setLocationWork] = useState("");
  const [country, setCountry] = useState("");
  const [experience, setExperience] = useState("");
  const { token } = useContext(userContext);
  const [loading, setLoading] = useState(false);

  console.log(title, description);
  useEffect(() => {
    axios
      .get("http://localhost:5000/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPosts(...posts, res.data.jobs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {token ? (
        <div className="ContainerJobs">
          <div className="cards-jobs">
            {posts.map((ele, i) => {
              return (
                <div
                  className="cards"
                  key={i}
                  onClick={(e) => {
                    const post = posts[i];
                    console.log(post);
                    setTitle(post.title);
                    setDescription(post.description);
                    setRequirements(post.requirements);
                    setTypeOfJob(post.typeOfJob);
                    sethHours(post.hours);
                    setLocationWork(post.locationWork);
                    setCountry(post.country);
                    setExperience(post.experience);
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{ele?.title ?? " "}</h5>
                    <span className="card-company">Findly LTD. Company</span>
                    <div className="experienceDiv">
                      {" "}
                      <ImBriefcase />{" "}
                      <p className="card-experience">
                        {ele?.experience ?? " "}
                      </p>{" "}
                    </div>
                    <div className="countryDiv">
                      {" "}
                      <ImLocation />{" "}
                      <p className="card-country">{ele?.country ?? " "}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {title && description && requirements ? (
            <div className="jobCardDetails">
              <div className="card-body-details">
                {<h5 className="card-title">{title}</h5>}
                <div className="descriptionDiv">
                  {" "}
                  <h5>Job Description</h5>
                  <p className="card-description">{description}</p>
                </div>

                <div className="requirementsDiv">
                  {" "}
                  <h5>Qualifications</h5>{" "}
                  <p className="card-requirements">{requirements}</p>
                </div>

                <div className="typeJobDiv">
                  {" "}
                  <p>Type job :</p>
                  <p className="card-typeOfWork">{typeOfJob ? (typeOfJob) : ("")}</p>
                </div>
                
                <div className="hoursDiv">
                  {" "}
                  <ImClock />
                  <p className="card-hours">
                  {hours ? hours + " hrs" : " "}
                </p>
                </div>
                {/* <p className="card-LocationWork">{locationWork}</p> */}
                <div className="experienceDiv">
                  {" "}
                  <ImBriefcase />
                  <p className="card-experience">
                    {experience ? experience + " yrs" : " "}
                  </p>
                </div>
                <div className="countryDiv">
                  {" "}
                  <ImLocation />{" "}
                  <p className="card-country">
                    {country ? country + " - " + locationWork : ""}
                  </p>
                </div>

                <button className="applyNow">Apply Now  </button>    

                <br />
                <p className="card-about">
                  <h5>About Company</h5>
                  OCC Weavers Ltd. <br />
                  Job Source: <a href="www.linkedin.com">www.linkedin.com</a>
                </p>
              </div>
            </div>
          ) : (
            <div className="jobCardDetails">
              <div className="card-body-details">
                {<h5 className="card-title">{posts[0]?.title}</h5>}
                <div className="descriptionDiv">
                  {" "}
                  <h5>Job Description</h5>{" "}
                  <p className="card-description">{posts[0]?.description}</p>
                </div>
                <p className="card-requirements">{posts[0]?.requirements}</p>
                <p className="card-typeOfWork">{posts[0]?.typeOfJob}</p>
                <p className="card-hours">{posts[0]?.hours}</p>
                <p className="card-LocationWork">{posts[0]?.locationWork}</p>
                <div className="experienceDiv">
                  {" "}
                  <ImBriefcase />
                  <p className="card-experience">
                    {experience ? experience + "yrs" : " "}
                  </p>
                </div>
                <div className="countryDiv">
                  {" "}
                  <ImLocation /> <p className="card-country">{country}</p>
                </div>
                <br />
                <button className="applyNow">Apply Now  </button>    
                
                <p className="card-about">
                  <h5>About Company</h5>
                  OCC Weavers Ltd. <br />
                  Job Source: <a href="www.linkedin.com">www.linkedin.com</a>
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="container">
          <div className="noPosts">
            <h2 className="header" data-text="404">
              404
            </h2>
            <h4 className="opps" data-text="Opps! Page not found">
              Opps! Page not found
            </h4>
            <p>
              Sorry, the page you're looking for doesn't exist. If you think
              something is broken, report a problem.
            </p>
            <div class="btns">
              <a href="/Login">Return login</a>
              <a href="/ReportProblem">Report problem</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Job;
