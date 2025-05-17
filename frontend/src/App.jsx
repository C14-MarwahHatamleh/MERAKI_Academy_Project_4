import "./App.css";
import React, { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import Job from "./components/jobs/Job";
import { Register } from "./components/Register/Register_Login/Register";
import Home from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import ReportProblem from "./components/ReportProblem/ReportProblem";
import Apply from "./components/Apply/Apply";
import Footer from "./components/Footer/Footer";
import Location from "./components/Location/Location";
import { useEffect } from "react";
import Profile from "./components/Profile/Profile";
import Applications from "./components/Applications/Applications";
import axios from "axios";

export const userContext = createContext();

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [UID, setUID] = useState(localStorage.getItem("UID"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [posts, setPosts] = useState([]);
  const [id, setID] = useState("");
  const [filterResults, SetFilter] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [applications, setApplications] = useState([]);

  localStorage.setItem("post", JSON.stringify(posts));

  return (
    <>
      <userContext.Provider
        value={{
          posts,
          setPosts,
          token,
          setToken,
          UID,
          setUID,
          role,
          setRole,
          filterResults,
          SetFilter,
          searchResults,
          setSearchResults,
          searchInput,
          setSearchInput,
          id,
          setID,
          userInfo,
          setUserInfo,
          applications, 
          setApplications
        }}
      >
        <div className="App">
          <Navigation />
        </div>

        <>
          {
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/jobs" element={<Job />} />
              <Route path="/signup-login" element={<Register />} />
              <Route path="/:id/apply" element={<Apply />} />
              <Route path="/:id/profile" element={<Profile />} />
              <Route path="/location" element={<Location />} />
              <Route path="/:id/my-applications" element={<Applications />} />
              {/* <Route path="/Login" element={<Login/>} /> */}
              <Route path="/ReportProblem" element={<ReportProblem />} />
              {/* <Route path="*" component={Missing} /> */}
            </Routes>
          }
          {/* {location.pathname !== "/signup-login" && <Footer />
            ? window.location.reload()
            : ""} */}
            {/* {location.pathname !== "/signup-login" &&<Footer/>}  */}
           

        </>
      </userContext.Provider>
    </>
  );
};

export default App;
