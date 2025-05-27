import axios from "axios";
import "./style.css";

import React from "react";
import { useContext } from "react";
import { userContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const DeactivatedUser = () => {
  // /:id/deleteUser
  //http://localhost:5000/users/byEmail/test7@gmail.com

  const { token, setToken } = useContext(userContext);
  const { id } = useParams();
  const [email, SetEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  //   const FindEmailUser = () => {
  //     axios
  //       .get(`http://localhost:5000/users/byEmail/${email}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((res) => {
  //         setMsg("Email is correct");
  //         setSuccess(true);
  //         setTimeout(() => {
  //           setMsg("");
  //         }, 3000);
  //         // console.log([...posts, res.data.jobs])
  //       })
  //       .catch((err) => {
  //         setMsg("Email is not correct");
  //         setSuccess(false);
  //         setTimeout(() => {
  //           setMsg("");
  //         }, 3000);
  //       });
  //   };

  const DeactivatedUser = () => {
    axios
      .delete(`http://localhost:5000/users/${id}/deleteUser`, {
        params: {
          email: email,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMsg(
          "Email is correct and the user has been Deactivated successfully"
        );
        setTimeout(() => {
          setMsg("");
        }, 3000);
        console.log("res", res);
        setSuccess(true);
        setToken(null);
        localStorage.clear("token");
        navigate("/signup-login");

        // console.log([...posts, res.data.jobs])
      })
      .catch((err) => {
        setMsg("Email is not correct");
        setSuccess(false);
        setTimeout(() => {
          setMsg("");
        }, 3000);
        console.log(err);
      });
  };

  return (
    <div className="DeactivatedUser">
      {/* <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="User's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2">
            @example.com
          </span>
        </div>
      </div> */}

      <div class="input-group  w-50 mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="User's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={(e) => {
            SetEmail(e.target.value);
          }}
        />
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2">
            @example.com
          </span>
        </div>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-light btn-md"
          onClick={(e) => {
            DeactivatedUser();
          }}
        >
          Deactivated User
        </button>
      </div>
      {msg && (
        <div className={success ? "success" : "failed"}>
          {" "}
          <p className="msgDeactivated">{msg}</p>
        </div>
      )}
    </div>
  );
};

export default DeactivatedUser;
