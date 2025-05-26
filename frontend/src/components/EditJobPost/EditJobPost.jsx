import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { userContext } from "../../App";
import axios from "axios";

const EditJobPost = () => {
  const [updatePost, SetUpdatePost] = useState({
    company: {
      name: "",
      website: "",
      companySize: "",
      companyType: "",
      companyLogo: "",
    },
    responsibilities: [],
    qualifications: [],
    skills: [],
    benefits: [],
    salary: {
      min: 0,
      max: 0,
    },
    experience: { minYears: 0, maxYears: 0 },
  });

  const [msg, setMsg] = useState("");
  const { token } = useContext(userContext);
  const { id, setID } = useContext(userContext);
  const { posts, setPosts } = useContext(userContext);

  const getAllJobs = () => {
    axios
      .get("http://localhost:5000/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("res", res);
        setPosts(res.data.jobs);
        // console.log([...posts, res.data.jobs])
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const UpdateJob = async () => {
    await axios
      .put(`http://localhost:5000/jobs/update/${id}`, updatePost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("res", res);
        setMsg("The job has been deleted");
        setTimeout(() => {
          setMsg("");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setMsg("The job has not been deleted");
        setTimeout(() => {
          setMsg("");
        }, 3000);
      });
  };

  useEffect(() => {
    getAllJobs();
  } , []);
  return (
    <div className="UpdatePostDiv">
      <div class="allPost">
        <p className="introPost">Select a job that you want to Update it.</p>
        <select
          class="form-select "
          size="10"
          multiple
          aria-label="multiple select example"
        >
          {posts.map((ele) => (
            <option
              onClick={(e) => {
                console.log(ele._id);
                setID(ele._id);
              }}
              value={ele.title}
            >
              {ele.title}
            </option>
          ))}
        </select>
      </div>

      <div class="addPostDiv">
        {" "}
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => {
            SetUpdatePost({ ...updatePost, title: e.target.value });
          }}
        />
        <div className="company">
          <span className="companyInfo">Company Info :</span>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => {
              SetUpdatePost({
                ...updatePost,
                company: { ...updatePost.company, name: e.target.value },
              });
            }}
          />
          <input
            type="text"
            placeholder="WebSite"
            onChange={(e) => {
              SetUpdatePost({
                ...updatePost,
                company: {
                  ...updatePost.company,
                  website: e.target.value,
                },
              });
            }}
          />

          <select
            class="form-select"
            aria-label="Default select example"
            onChange={(e) => {
              SetUpdatePost({
                ...updatePost,
                company: {
                  ...updatePost.company,
                  companySize: e.target.value,
                },
              });
            }}
          >
            <option selected disabled>
              Company Size
            </option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="201-500">201-500</option>
            <option value="501-1000">501-1000</option>
            <option value="1000+">1000+</option>
          </select>

          <select
            class="form-select"
            aria-label="Default select example"
            onChange={(e) => {
              SetUpdatePost({
                ...updatePost,
                company: {
                  ...updatePost.company,
                  companyType: e.target.value,
                },
              });
            }}
          >
            <option selected disabled>
              Company Type
            </option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
            <option value="Government">Government</option>
            <option value="Non-Profit">Non-Profit</option>
          </select>
          <input
            type="text"
            placeholder="Logo"
            onChange={(e) => {
              SetUpdatePost({
                ...updatePost,
                company: {
                  ...updatePost.company,
                  companyLogo: e.target.value,
                },
              });
            }}
          />
        </div>
        <div className="jobDetails">Job Details :</div>
        <div class="input-group mb-3">
          <textarea
            class="form-control"
            aria-label="With textarea"
            placeholder="Description"
            onChange={(e) => {
              SetUpdatePost({
                ...updatePost,
                description: e.target.value,
              });
            }}
          ></textarea>
        </div>
        <div class="input-group mb-3">
          <textarea
            class="form-control"
            aria-label="With textarea"
            placeholder="Responsibilities"
            onChange={(e) => {
              SetUpdatePost({
                ...updatePost,
                responsibilities: [
                  ...updatePost.responsibilities,
                  e.target.value,
                ],
              });
            }}
          ></textarea>
        </div>
        <div class="input-group mb-3">
          <textarea
            class="form-control"
            aria-label="With textarea"
            placeholder="Qualifications"
            onChange={(e) => {
              SetUpdatePost({
                ...updatePost,
                qualifications: [...updatePost.qualifications, e.target.value],
              });
            }}
          ></textarea>
        </div>
        <div class="input-group mb-3">
          <textarea
            class="form-control"
            aria-label="With textarea"
            placeholder="Skills"
            onChange={(e) => {
              SetUpdatePost({
                ...updatePost,
                skills: [...updatePost.skills, e.target.value],
              });
            }}
          ></textarea>
        </div>
        <div class="input-group mb-3">
          <textarea
            class="form-control"
            aria-label="With textarea"
            placeholder="Benefits"
            onChange={(e) => {
              SetUpdatePost({
                ...updatePost,
                benefits: [...updatePost.benefits, e.target.value],
              });
            }}
          ></textarea>
        </div>
        <div className="DivTypeOfJob">
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={(e) => {
              SetUpdatePost({
                ...updatePost,
                typeOfJob: e.target.value,
              });
            }}
          >
            <option selected disabled>
              Type Of Job
            </option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Temporary">Temporary</option>
            <option value="Internship">Internship</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Working Hours"
          onChange={(e) => {
            SetUpdatePost({
              ...updatePost,
              workingHours: e.target.value,
            });
          }}
        />
        <div className="salary">
          <input
            type="number"
            placeholder="Min Salary"
            onChange={(e) => {
              SetUpdatePost({
                ...updatePost,
                salary: {
                  ...updatePost.salary,
                  min: Number(e.target.value),
                },
              });
            }}
          />
          <input
            type="number"
            placeholder="Max Salary"
            onChange={(e) => {
              SetUpdatePost({
                ...updatePost,
                salary: {
                  ...updatePost.salary,
                  max: Number(e.target.value),
                },
              });
            }}
          />
        </div>
        <div className="DivLocationWork">
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={(e) => {
              SetUpdatePost({
                ...updatePost,
                locationWork: e.target.value,
              });
            }}
          >
            <option selected disabled>
              Location Work
            </option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Country"
          onChange={(e) => {
            SetUpdatePost({
              ...updatePost,
              country: e.target.value,
            });
          }}
        />
        <div className="experiencesOfYears">
          <input
            type="number"
            placeholder="Min Experience"
            onChange={(e) => {
              SetUpdatePost({
                ...updatePost,
                experience: {
                  ...updatePost.experience,
                  minYears: Number(e.target.value),
                },
              });
            }}
          />
          <input
            type="number"
            placeholder="Max Experience"
            onChange={(e) => {
              SetUpdatePost({
                ...updatePost,
                experience: {
                  ...updatePost.experience,
                  maxYears: Number(e.target.value),
                },
              });
            }}
          />
        </div>
        <button type="button" class="btn btn-light btn-md" onClick={UpdateJob}>
          Update a job
        </button>
      </div>
    </div>
  );
};

export default EditJobPost;
