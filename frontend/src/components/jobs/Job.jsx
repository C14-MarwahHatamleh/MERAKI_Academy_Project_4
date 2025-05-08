import "./style.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Job = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState([{}]);
  const [description, setDescription] = useState([{}]);
console.log(title , description)
  useEffect(() => {
    axios
      .get("http://localhost:5000/jobs", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3VudHJ5IjoiSXJiaWQiLCJ1c2VySUQiOiI2ODFiM2QyMmI1YjAwM2QzN2FmZDc0OGIiLCJyb2xlIjp7InJvbGUiOiJBRE1JTiIsInBlcm1pc3Npb25zIjpbIk1BTkdBRV9VU0VSUyIsIkRFTEVURV9KT0JTIiwiREVMRVRFX0NPTU1FTlRTIiwiQ1JFQVRFX0pPQlMiLCJVUERBVEVfSk9CUyIsIkNSRUFURV9DT01NRU5UUyIsIlVQREFURV9DT01NRU5UUyJdfSwiaWF0IjoxNzQ2NzAzODM3LCJleHAiOjE3NDczMDg2Mzd9.8W1d6-S_wwm39jChtD6ZX4TLoBAXNHJi4ffxnN9MhnI`,
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
      <div className="ContainerJobs">
        <div className="cards-jobs">
          {posts.map((ele, i) => {
            return (
              <div
                className="cards"
                key={i}
                onClick={(e) => {
                  const post = posts[i]
                  console.log(post)
                  setTitle(...title, post.title)
                  setDescription(...description , post.description)
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
        <div className="jobCardDetails">
          <div className="card-body-details">
           { <h5 className="card-title">{title}</h5>}
           { <p className="card-description">{description}</p>}
            <p className="card-requirements">test</p>
            <p className="card-typeOfWork">test</p>
            <p className="card-hours">test</p>
            <p className="card-LocationWork">test</p>
            <a href="#" className="btnApply ">
              Apply
            </a>
            <br />
            <p className="card-about">
              <h5>About Company</h5>
              OCC Weavers Ltd. <br />
              Job Source: <a href ="www.linkedin.com">www.linkedin.com</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Job;
