import "./style.css";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../../App";

const Job = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [typeOfJob, setTypeOfJob] = useState("");
  const [hours, sethHours] = useState("");
  const [locationWork, setLocationWork] = useState("");
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
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{ele.title}</h5>
                    <p className="card-text">{ele.description}.</p>
                  </div>
                </div>
              );
            })}
          </div>

          {title && description && requirements ? (
            <div className="jobCardDetails">
              <div className="card-body-details">
                {<h5 className="card-title">{title}</h5>}
                {<p className="card-description">{description}</p>}
                <p className="card-requirements">{requirements}</p>
                <p className="card-typeOfWork">{typeOfJob}</p>
                <p className="card-hours">{hours}</p>
                <p className="card-LocationWork">{locationWork}</p>
                <a href="#" className="btnApply ">
                  Apply
                </a>
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
                {<p className="card-description">{posts[0]?.description}</p>}
                <p className="card-requirements">{posts[0]?.requirements}</p>
                <p className="card-typeOfWork">{posts[0]?.typeOfJob}</p>
                <p className="card-hours">{posts[0]?.hours}</p>
                <p className="card-LocationWork">{posts[0]?.locationWork}</p>
                <a href="#" className="btnApply ">
                  Apply
                </a>
                <br />
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
          <h2 className="header" data-text ="404">404</h2>
          <h4 className ="opps" data-text="Opps! Page not found">Opps! Page not found</h4>
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
