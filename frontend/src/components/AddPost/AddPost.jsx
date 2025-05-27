import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { userContext } from "../../App";
import axios from "axios";

const AddPost = () => {
  const [msg, setMsg] = useState("");
  const { posts, setPosts } = useContext(userContext);
  const { id, setID } = useContext(userContext);
  const { token } = useContext(userContext);

  const [addPost, SetAddPost] = useState({
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
      min: 290,
      max: 10000,
    },
    experience: { minYears: 0, maxYears: 0 },
  });

  const AddPostJob = () => {
    axios
      .post("http://localhost:5000/jobs", addPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setMsg("The post has been added");
      })
      .catch((err) => {
        console.log(err);
        setMsg("The post has not been added");
      });
  };
  return (
    <div class="addPostDiv">
      {" "}
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => {
          SetAddPost({ ...addPost, title: e.target.value });
        }}
      />
      <div className="company">
        <span className="companyInfo">Company Info :</span>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            SetAddPost({
              ...addPost,
              company: { ...addPost.company, name: e.target.value },
            });
          }}
        />
        <input
          type="text"
          placeholder="WebSite"
          onChange={(e) => {
            SetAddPost({
              ...addPost,
              company: { ...addPost.company, website: e.target.value },
            });
          }}
        />

        <select
          class="form-select"
          aria-label="Default select example"
          onChange={(e) => {
            SetAddPost({
              ...addPost,
              company: {
                ...addPost.company,
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
            SetAddPost({
              ...addPost,
              company: {
                ...addPost.company,
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
            SetAddPost({
              ...addPost,
              company: {
                ...addPost.company,
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
            SetAddPost({
              ...addPost,
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
            SetAddPost({
              ...addPost,
              responsibilities: [...addPost.responsibilities, e.target.value],
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
            SetAddPost({
              ...addPost,
              qualifications: [...addPost.qualifications, e.target.value],
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
            SetAddPost({
              ...addPost,
              skills: [...addPost.skills, e.target.value],
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
            SetAddPost({
              ...addPost,
              benefits: [...addPost.benefits, e.target.value],
            });
          }}
        ></textarea>
      </div>
      <div className="DivTypeOfJob">
        <select
          class="form-select"
          aria-label="Default select example"
          onChange={(e) => {
            SetAddPost({
              ...addPost,
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
          SetAddPost({
            ...addPost,
            workingHours: e.target.value,
          });
        }}
      />
      <div className="salary">
        <input
          type="number"
          placeholder="Min Salary"
          onChange={(e) => {
            SetAddPost({
              ...addPost,
              salary: {
                ...addPost.salary,
                min: Number(e.target.value),
              },
            });
          }}
        />
        <input
          type="number"
          placeholder="Max Salary"
          onChange={(e) => {
            SetAddPost({
              ...addPost,
              salary: {
                ...addPost.salary,
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
            SetAddPost({
              ...addPost,
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
          SetAddPost({
            ...addPost,
            country: e.target.value,
          });
        }}
      />
      <div className="experiencesOfYears">
        <input
          type="number"
          placeholder="Min Experience"
          onChange={(e) => {
            SetAddPost({
              ...addPost,
              experience: {
                ...addPost.experience,
                minYears: Number(e.target.value),
              },
            });
          }}
        />
        <input
          type="number"
          placeholder="Max Experience"
          onChange={(e) => {
            SetAddPost({
              ...addPost,
              experience: {
                ...addPost.experience,
                maxYears: Number(e.target.value),
              },
            });
          }}
        />
      </div>
      <div className="Status">
        <select
          class="form-select"
          aria-label="Default select example"
          onChange={(e) => {
            SetAddPost({
              ...addPost,
              status: e.target.value,
            });
          }}
        >
          <option selected disabled>
            Status
          </option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
      <button type="button" class="btn btn-light btn-md" onClick={AddPostJob}>
        Submit
      </button>
    </div>
  );
};

export default AddPost;
