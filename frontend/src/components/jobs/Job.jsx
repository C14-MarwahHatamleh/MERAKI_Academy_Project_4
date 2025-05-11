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
import { useParams } from "react-router-dom";

const Job = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [qualifications, setQualifications] = useState([]);
  const [skills, setSkills] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [responsibilities, setResponsibilities] = useState([]);
  const [typeOfJob, setTypeOfJob] = useState("");
  const [hours, sethHours] = useState("");
  const [locationWork, setLocationWork] = useState("");
  const [country, setCountry] = useState("");
  const [experience, setExperience] = useState({});
  const [salary, setSalary] = useState({});
  const [company, setCompanyInfo] = useState({});
  const [status, setStatus] = useState("");
  const [showBtns, SetShowBtns] = useState(false);
  const { token } = useContext(userContext);
  const { posts, setPosts } = useContext(userContext);
  const [filterResults, SetFilterResults] = useState([]);
  const [salaryMinRange, SetMinSalary] = useState("");
  const [salaryMaxRange, SetMaxSalary] = useState("");
  const [countryOption, SetcountryOption] = useState("");
  const [typeOfJobOption, SetTypeOfJobOption] = useState("");
  localStorage.setItem("post", JSON.stringify(posts));
  let LS = JSON.parse(sessionStorage.getItem("post"));

  const SalaryFilter = async () => {
    await axios
      .get(
        `http://localhost:5000/jobs/filter/` +
          salaryMinRange +
          "/" +
          salaryMaxRange,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.result);
        SetFilterResults(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filter = async (criteria) => {
    await axios
      .get(`http://localhost:5000/jobs/filter/` + criteria, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.result);
        SetFilterResults(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllJobs = () => {
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
  };

  useEffect(() => {
    getAllJobs();
  }, []);
  return (
    <>
      <div className="filterDiv">
        <p className="JobSearch">Job Filter</p>
        <button
          className="filterBtn"
          onClick={(e) => {
            SetShowBtns(true);
          }}
        >
          <ImFilter />
          <p className="text-filter">
            <span>All Filters</span>
          </p>
        </button>
        {showBtns && (
          <>
            {/* <button
              className="filterTypeOfJob  filterBtn"
              onClick={(e) => {
                filter("full time")
              
              }}
            >
              Type Of Job
            </button> */}
            <div class="dropdown">
              <select
                name="typeOfJob"
                onClick={(e) => {
                  filter(e.target.value);
                }}
              >
                <option value="" selected disabled hidden>
                  Types Of Job
                </option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            <div class="dropdown">
              <select
                name="countries"
                onChange={(e) => {
                  filter(e.target.value);
                }}
              >
                <option value="" selected disabled hidden>
                  Countries
                </option>
                <option value="United States">United States</option>
                <option value="Afghanistan">Afghanistan</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="American Samoa">American Samoa</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Armenia">Armenia</option>
                <option value="Aruba">Aruba</option>
                <option value="Australia">Australia</option>
                <option value="Brazil">Brazil</option>
                <option value="British Indian Ocean Territory">
                  British Indian Ocean Territory
                </option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burundi">Burundi</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Denmark">Denmark</option>
                <option value="Egypt">Egypt</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Greece">Greece</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jordan">Jordan</option>
                <option value="Qatar">Qatar</option>
                <option value="Qatar">Saudi Arabia</option>
                <option value="United Arab Emirates">
                  United Arab Emirates
                </option>
              </select>
            </div>

            <div className="min-max">
              <div className="min">
                <label htmlFor="Min">
                  Min:
                  <span className="min-value">
                    {salaryMinRange ? salaryMinRange : "290"}
                  </span>
                </label>
              </div>
              <div className="max">
                <label htmlFor="Max">
                  Max:
                  <span className="max-value">
                    {salaryMaxRange ? salaryMaxRange : "10000"}
                  </span>
                </label>
              </div>
            </div>
            <div class="dropdown">
              {/* <label for="salaryRange">
                Salary{" "}
                <span>{salaryRange ? "290 - " + salaryRange : "290"}</span>
              </label> */}
              <input
                type="range"
                className="range"
                name="salary"
                min="290"
                max="5000"
                onChange={(e) => {
                  console.log(e);
                  SetMinSalary(e.target.value);
                }}
              />
              <input
                type="range"
                className="range"
                name="salary"
                min="5001"
                max="10000"
                onChange={(e) => {
                  console.log(e);
                  SetMaxSalary(e.target.value);

                  SalaryFilter(Number(salaryMinRange), Number(salaryMaxRange));
                }}
              />
            </div>
          </>
        )}
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
                    setResponsibilities(ele.responsibilities);
                    setQualifications(ele.qualifications);
                    setBenefits(ele.benefits);
                    setSkills(ele.skills);
                    setTypeOfJob(post.typeOfJob);
                    sethHours(post.workingHours);
                    setLocationWork(post.locationWork);
                    setCountry(post.country);
                    setExperience(post.experience);
                    setSalary(post.salary);
                    setCompanyInfo(post.company);
                    setStatus(post.status);
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{ele?.title ?? " "}</h5>
                    <div className="card-company">
                      {" "}
                      <span className="company-name">
                        {LS[0]?.company.name}
                      </span>
                      <span className="company-size">{}</span>{" "}
                    </div>

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
                        {ele.workingHours ? ele.workingHours + " hrs" : " "}
                      </p>
                    </div>
                    <div className="experienceDiv">
                      <ImBriefcase />
                      <p className="card-experience">
                        {ele.experience.minYears && ele.experience.maxYears
                          ? ele.experience.minYears +
                            " - " +
                            ele.experience.maxYears +
                            " yrs"
                          : " "}
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
            {title && description && qualifications && responsibilities ? (
              <div className="card-body-details">
                {<h5 className="card-title">{title}</h5>}
                <div className="card-company">
                  {" "}
                  <span className="company-name">
                    {company?.name}{" "}
                    <span className="company-type">
                      {" - "}
                      {company?.companyType}
                    </span>
                  </span>
                </div>
                <div className="descriptionDiv">
                  {" "}
                  <h5>Job Description</h5>
                  <p className="card-description">{description}</p>
                </div>

                <div className="requirementsDiv">
                  {" "}
                  <h5>Qualifications</h5>{" "}
                  {qualifications.map((e, i) => {
                    return (
                      <p className="card-requirements" key={i}>
                        {" - "}
                        {e}
                      </p>
                    );
                  })}
                </div>

                <div className="responsibilitiesDiv">
                  {" "}
                  <h5>Responsibilities</h5>
                  {responsibilities.map((e, i) => {
                    return (
                      <p className="card-responsibilities" key={i}>
                        {" - "}
                        {e}
                      </p>
                    );
                  })}
                </div>
                <div className="SkillsDiv">
                  {" "}
                  <h5>Skills</h5>
                  {skills.map((e, i) => {
                    return (
                      <p className="card-skills" key={i}>
                        {" - "}
                        {e}
                      </p>
                    );
                  })}
                </div>
                <div className="benefitsDiv">
                  {" "}
                  <h5>Benefits</h5>{" "}
                  {benefits.map((e, i) => {
                    return (
                      <p className="card-benefits" key={i}>
                        {" - "}
                        {e}
                      </p>
                    );
                  })}
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
                    {experience.minYears && experience.maxYears
                      ? experience.minYears +
                        " - " +
                        experience.maxYears +
                        " yrs"
                      : " "}
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
                <div className="card-company">
                  {" "}
                  <span className="company-name">
                    {LS[0]?.company.name}{" "}
                    <span className="company-type">
                      {" - "}
                      {LS[0]?.company.companyType}
                    </span>
                  </span>
                </div>
                <div className="descriptionDiv">
                  {" "}
                  <h5>Job Description</h5>
                  <p className="card-description">{LS[0]?.description}</p>
                </div>
                <div className="requirementsDiv">
                  {" "}
                  <h5>Qualifications</h5>{" "}
                  {posts[0]?.qualifications.map((e, i) => {
                    return (
                      <p className="card-requirements" key={i}>
                        {" - "}
                        {e}
                      </p>
                    );
                  })}
                </div>
                <div className="responsibilitiesDiv">
                  {" "}
                  <h5>Responsibilities</h5>{" "}
                  {posts[0]?.responsibilities.map((e, i) => {
                    return (
                      <p className="card-responsibilities" key={i}>
                        {" - "}
                        {e}
                      </p>
                    );
                  })}
                </div>
                <div className="SkillsDiv">
                  {" "}
                  <h5>Skills</h5>{" "}
                  {posts[0]?.skills.map((e, i) => {
                    return (
                      <p className="card-skills">
                        {" "}
                        {" - "}
                        {e}
                      </p>
                    );
                  })}
                </div>
                <div className="benefitsDiv">
                  {" "}
                  <h5>Benefits</h5>{" "}
                  {posts[0]?.benefits.map((e, i) => {
                    return (
                      <p className="card-benefits" key={i}>
                        {" - "}
                        {e}
                      </p>
                    );
                  })}
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
                    {posts[0]?.workingHours
                      ? posts[0]?.workingHours + " hrs"
                      : " "}
                  </p>
                </div>

                {/* <p className="card-LocationWork">{posts[0]?.locationWork}</p> */}
                <div className="experienceDiv">
                  {" "}
                  <ImBriefcase />
                  <p className="card-experience">
                    {posts[0]?.experience.minYears}
                    {" - "}
                    {posts[0]?.experience.maxYears + " yrs"}
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
