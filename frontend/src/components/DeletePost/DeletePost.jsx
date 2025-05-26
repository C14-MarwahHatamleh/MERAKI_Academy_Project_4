import axios from "axios";
import React from "react";
import { useState } from "react";
import { userContext } from "../../App";
import { useContext } from "react";
import { useEffect } from "react";




const DeletePost = () => {
  const [msg, setMsg] = useState("");
  const { id, setID } = useContext(userContext);
  const { token } = useContext(userContext);
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

  useEffect(()=>{
    getAllJobs()
  },[])
  return (
    <div class="deletePostDiv">
      <p className="introDelete">Select a job that you want to delete it.</p>
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
  );
};

export default DeletePost;
