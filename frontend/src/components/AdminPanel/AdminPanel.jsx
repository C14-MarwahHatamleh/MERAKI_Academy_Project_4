import React, { useContext, useState } from "react";
import "./style.css";
import axios from "axios";
import moment from "moment";
import { userContext } from "../../App";
import { Button, Select } from "antd";
import { useEffect } from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

let LS = JSON.parse(localStorage.getItem("post"));
console.log(LS);
const AdminPanel = () => {
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

  console.log(addPost);
  const [msg, setMsg] = useState("");
  const [DeletePostFlag, setDeletePostFlag] = useState(false);
  const [PostFlag, setPostFlag] = useState(false);
  const [UpdateFlag, setUpdateFlag] = useState(false);
  const [GetAppsFlag, setGetAppsFlag] = useState(false);
  const [GetUserFlag, setGetUsersFlag] = useState(false);
  const { posts, setPosts } = useContext(userContext);
  const { id, setID } = useContext(userContext);
  const { token } = useContext(userContext);
  const [applications, setApplications] = useState([]);
  const [AllApplications, setAllApplications] = useState([]);
  const navigate = useNavigate();



   


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

  const DeleteJob = async () => {
    await axios
      .delete(`http://localhost:5000/jobs/delete/${id}`, {
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

        // console.log([...posts, res.data.jobs])
      })
      .catch((err) => {
        console.log(err);
        setMsg("The job has not been deleted");
        setTimeout(() => {
          setMsg("");
        }, 3000);
      });
  };

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

  useEffect(() => {
    getAllJobs();
    GetAllApplications();
   
  }, []);
  //
  return (
    <>
      <>
        <div className="AdminPanelContainer">
          <div className="ButtonsAdmin">
            <button
              onClick={(e) => {
                navigate("/AddPost");
              }}
              type="button"
              class="btn btn-outline-secondary"
            >
              Add a post
            </button>
            <button
              onClick={(e) => {
                navigate("/DeletePost");
              }}
              type="button"
              class="btn btn-outline-secondary"
            >
              Delete a job
            </button>
            <button
              onClick={(e) => {
                 navigate("/EditPost");
                
              }}
              type="button"
              class="btn btn-outline-secondary"
            >
              Edit a job
            </button>
            <button
              onClick={(e) => {
                navigate("/GetAllApplications");
              }}
              type="button"
              class="btn btn-outline-secondary"
            >
              Get All Applications
            </button>
            <button
              onClick={(e) => {
                navigate("/GetAllUsers")
              }}
              type="button"
              class="btn btn-outline-secondary"
            >
              Get All Users
            </button>
          </div>
        </div>

        {PostFlag && (
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
                    responsibilities: [
                      ...addPost.responsibilities,
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
            <button
              type="button"
              class="btn btn-light btn-md"
              onClick={AddPostJob}
            >
              Submit
            </button>
          </div>
        )}

        {DeletePostFlag && (
          <div class="deletePostDiv">
            <p className="introDelete">
              Select a job that you want to delete it.
            </p>
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

            <button
              className="btnDelete"
              type="button"
              class="btn btn-light btn-md"
              onClick={DeleteJob}
            >
              Delete a job
            </button>
          </div>
        )}

        {UpdateFlag && (
          <div className="UpdatePostDiv">
            <div class="allPost">
              <p className="introPost">
                Select a job that you want to Update it.
              </p>
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
                      qualifications: [
                        ...updatePost.qualifications,
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
              <button
                type="button"
                class="btn btn-light btn-md"
                onClick={UpdateJob}
              >
                Update a job
              </button>
            </div>
          </div>
        )}

        {GetAppsFlag && (
          <div className="GetAllApplications">
            <div className="cards-application">
              {applications?.map((ele, i) => {
                console.log("searchResults", ele);
                return (
                  <div className="cards-app" key={i}>
                    <div className="card-body">
                      <p className="intro">
                        {" "}
                        Application {ele?.firstName ?? "N/A"}
                      </p>
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
                          Years Of Experiences :{" "}
                          {ele?.yearsOfExperiences ?? "N/A"}
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
        )}

        {GetUserFlag && (
          <div className="GetAllUsers">
            <div className="cards-users">
              {AllApplications?.map((ele, i) => {
                console.log("searchResults", ele);
                return (
                  <div className="cards-user" key={i}>
                    <div className="card-body">
                      <p className="intro"> User {ele?.firstName ?? " N/A"}</p>
                      <div className="class-email">
                        <p lassName="card-email cardDiv">
                          {" "}
                          Email :{ele?.Email ?? " N/A"}
                        </p>
                      </div>
                      <div className="class-phone">
                        <p className="card-typeOfWork cardDiv">
                          Phone : {ele.Phone}
                        </p>
                      </div>
                      <div className="class-title">
                        <p className="card-typeOfWork cardDiv">
                          Country : {ele?.country ?? " N/A"}
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
                          Age : {ele?.age ?? "N/A"}
                        </p>
                      </div>
                      <div className=" class-experience">
                        <p className="card-experience cardDiv">
                          {" "}
                          Role : {ele?.role.role ?? "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default AdminPanel;
