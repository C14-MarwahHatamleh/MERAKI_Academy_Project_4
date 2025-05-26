import "./style.css";
import React, { useContext, useState } from "react";
import { userContext } from "../../App";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Apply = () => {
  const { id } = useParams();
  const [image, setImage] = useState([]);
  const [url, setUrl] = useState("");
  const { posts, setPosts } = useContext(userContext);
  const { token, setToken, setUID, setRole } = useContext(userContext);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  console.log(userInfo);

  const Apply = () => {
    axios
      .post(
        `http://localhost:5000/jobs/${id}/apply`,
        userInfo,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("Sent Successfully!");
        setSuccess(true);
      })
      .catch((err) => {
        setSuccess(false);
        toast.error("Can't Send an application!. Please Try again");
      });
  };

  const uploadImage = () => {
    const data = new FormData();
    console.log("data", data);
    data.append("file", image);
    data.append("upload_preset", "JobSearch");
    data.append("cloud_name", "do0zwgmuh");
    fetch("https://api.cloudinary.com/v1_1/do0zwgmuh/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUserInfo({ ...userInfo, cvURL: data.url });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div class="apply_section">
        <div class="container">
          <div class="row bg_3">
            <h2 class="ApplyTheJob">
              <i>Apply the job</i>
            </h2>
            {/* onChange={(e) => {
                      setUserInfo({
                        ...userInfo,
                        email: e.target.value,
                      }); */}
            <div class="col-3 input-effect">
              <input
                onChange={(e) => {
                  setUserInfo({ ...userInfo, firstName: e.target.value });
                }}
                class="effect-16"
                type="text"
                value={userInfo.firstName}
                placeholder=""
              />
              <label>First Name</label>
              <span class="focus-border"></span>
            </div>
            <div class="col-3 input-effect">
              <input
                onChange={(e) => {
                  setUserInfo({ ...userInfo, lastName: e.target.value });
                }}
                class="effect-16"
                type="text"
                placeholder=""
              />
              <label>Last Name</label>
              <span class="focus-border"></span>
            </div>
            <div class="col-3 input-effect">
              <input
                onChange={(e) => {
                  setUserInfo({ ...userInfo, Email: e.target.value });
                }}
                class="effect-16"
                type="text"
                placeholder=""
              />
              <label>Email</label>
              <span class="focus-border"></span>
            </div>
            <div class="col-3 input-effect">
              <input
                onChange={(e) => {
                  setUserInfo({ ...userInfo, title: e.target.value });
                }}
                class="effect-16"
                type="text"
                placeholder=""
              />
              <label>Title Job</label>
              <span class="focus-border"></span>
            </div>
            <div class="col-3 input-effect">
              <input
                onChange={(e) => {
                  setUserInfo({ ...userInfo, Phone: e.target.value });
                }}
                class="effect-16"
                type="tel"
                placeholder=""
              />
              <label>Phone</label>
              <span class="focus-border">
                <i></i>
              </span>
            </div>
            <div class="col-3 input-effect">
              <input
                onChange={(e) => {
                  setUserInfo({ ...userInfo, country: e.target.value });
                }}
                class="effect-16"
                type="text"
                placeholder=""
              />
              <label>Country</label>
              <span class="focus-border"></span>
            </div>
            <div class="col-3 input-effect">
              <input
                onChange={(e) => {
                  setUserInfo({ ...userInfo, Education: e.target.value });
                }}
                class="effect-16"
                type="text"
                placeholder=""
              />
              <label>Education</label>
              <span class="focus-border">
                <i></i>
              </span>
            </div>
            <div class="col-3 input-effect">
              <input
                onChange={(e) => {
                  setUserInfo({ ...userInfo, salary: e.target.value });
                }}
                class="effect-16"
                type="text"
                placeholder=""
              />
              <label>Expected Salary</label>
              <span class="focus-border">
                <i></i>
              </span>
            </div>
            <div class="col-3 input-effect">
              <input
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    yearsOfExperiences: e.target.value,
                  });
                }}
                class="effect-16"
                type="text"
                placeholder=""
              />
              <label>years of experiences</label>
              <span class="focus-border"></span>
            </div>
            <div class="col-3 input-effect">
              <input
                onChange={(e) => {
                  setUserInfo({ ...userInfo, currentJob: e.target.value });
                }}
                class="effect-16"
                type="text"
                placeholder=""
              />
              <label>Current job</label>
              <span class="focus-border"></span>
            </div>
            <div class="col-3 input-effect">
              <input
                onChange={(e) => {
                  setUserInfo({ ...userInfo, employer: e.target.value });
                }}
                class="effect-16"
                type="text"
                placeholder=""
              />
              <label>Employer</label>
              <span class="focus-border"></span>
            </div>

            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            ></input>
          </div>
          <button
            className="submit"
            onClick={(e) => {
              Apply();
              uploadImage();
              setTimeout(() => {
                window.location.reload();
              }, 6000);
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Apply;
