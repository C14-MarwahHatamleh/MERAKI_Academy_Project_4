import React from "react";
import { useContext } from "react";
import { userContext } from "../../App";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const GetAllUsers = () => {
  const { id, setID } = useContext(userContext);
  const [AllApplications, setAllApplications] = useState([]);
  const { posts, setPosts } = useContext(userContext);
  const { token } = useContext(userContext);

  const GetAllUsers = () => {
    axios
      .get(`http://localhost:5000/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAllApplications(res.data.Users);
        // console.log([...posts, res.data.jobs])
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetAllUsers();
  }, []);

  return (
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
                  <p className="card-typeOfWork cardDiv">Phone : {ele.Phone}</p>
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
  );
};

export default GetAllUsers;
