/* eslint-disable no-constant-binary-expression */
import "./style.css";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../../App";
import {
  ImBriefcase,
  ImLocation,
  ImClock,
  ImHome2,
  ImFilter,
} from "react-icons/im";

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
      <div className="filterDiv">
        <p className="JobSearch">Job Filter</p>
        <button
          className="filterBtn"
          onClick={(e) => {
            <></>;
          }}
        >
          <ImFilter />
          <p className="text-filter">
            <span>All Filters</span>
          </p>
        </button>
        <button className="filterTypeOfJob  filterBtn">Type Of Job</button>
        <button className="filterCountry filterBtn"> Country</button>
        <button className="filterTitle filterBtn"> Title</button>
        <button className="filterSalary filterBtn"> Salary</button>
      </div>
      <div>
        <p className="paraOfCardsJobs">Recently Jobs</p>
      </div>

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
                    <div className="typeJobDiv">
                      {" "}
                      <ImHome2 />
                      <p className="card-typeOfWork">
                        {ele.typeOfJob ? ele.typeOfJob : ""}
                      </p>
                    </div>
                    <div className="hoursDiv">
                      <ImClock />
                      <p className="card-hours">
                        {ele.hours ? ele.hours + " hrs" : " "}
                      </p>
                    </div>
                    <div className="experienceDiv">
                      <ImBriefcase />
                      <p className="card-experience">
                        {ele.experience ? ele.experience + " yrs" : " "}
                      </p>
                    </div>
                    <div className="countryDiv">
                      <ImLocation />
                      {/* " - " + locationWork */}
                      <p className="card-country">
                        {ele.country ? ele.country + " - " : " "}{" "}
                        {ele.locationWork ? ele.locationWork : " "}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="jobCardDetails">
            {title && description && requirements ? (
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
                  <ImHome2 />
                  <p className="card-typeOfWork">
                    {typeOfJob ? typeOfJob : ""}
                  </p>
                </div>

                <div className="hoursDiv">
                  {" "}
                  <ImClock />
                  <p className="card-hours">{hours ? hours + " hrs" : " "}</p>
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

                <button className="applyNow">Apply Now </button>

                <br />
                <p className="card-about">
                  <h5>About Company</h5>
                  OCC Weavers Ltd. <br />
                  Job Source: <a href="www.linkedin.com">www.linkedin.com</a>
                </p>
              </div>
            ) : (
              <div className="card-body-details">
                {<h5 className="card-title">{posts[0]?.title}</h5>}
                <div className="descriptionDiv">
                  {" "}
                  <h5>Job Description</h5>
                  <p className="card-description">{posts[0]?.description}</p>
                </div>
                <div className="requirementsDiv">
                  {" "}
                  <h5>Qualifications</h5>{" "}
                  <p className="card-requirements">{posts[0]?.requirements}</p>
                </div>
                <div className="typeJobDiv">
                  {" "}
                  <ImHome2 />
                  <p className="card-typeOfWork">{posts[0]?.typeOfJob}</p>
                </div>
                <div className="hoursDiv">
                  {" "}
                  <ImClock />
                  <p className="card-hours">
                    {posts[0]?.hours ? posts[0]?.hours + " hrs" : " "}
                  </p>
                </div>

                {/* <p className="card-LocationWork">{posts[0]?.locationWork}</p> */}
                <div className="experienceDiv">
                  {" "}
                  <ImBriefcase />
                  <p className="card-experience">
                    {posts[0]?.experience ? posts[0]?.experience + " yrs" : " "}
                  </p>
                </div>
                <div className="countryDiv">
                  {" "}
                  <ImLocation />{" "}
                  <p className="card-country">
                    {posts[0]?.country ? posts[0]?.country + " - " : " "}
                    {posts[0]?.locationWork ? posts[0]?.locationWork : " "}
                  </p>
                </div>

                <button className="applyNow">Apply Now </button>

                <br />
                <p className="card-about">
                  <h5>About Company</h5>
                  OCC Weavers Ltd. <br />
                  Job Source: <a href="www.linkedin.com">www.linkedin.com</a>
                </p>
              </div>
            )}
            <div className="">test</div>
          </div>
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
