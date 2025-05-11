import "./App.css";
import React, { useState ,createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import Job from "./components/jobs/Job";
import { Register } from "./components/Register/Register";
import Home from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import ReportProblem from "./components/ReportProblem/ReportProblem";


export const userContext = createContext();

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [UID, setUID] = useState(localStorage.getItem("UID"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [posts, setPosts] = useState([]);
  const [filterResults, SetFilter] = useState([]);
  const [SearchResults, SetSearch] = useState([]);

  
  return (
    <>
      <userContext.Provider 
      value={{ posts, setPosts, token, setToken, UID, setUID, role, setRole ,filterResults, SetFilter,SearchResults, SetSearch }}>
        <div className="App">
         <Navigation/>
        </div>
        <>
        { <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/jobs" element={<Job/>} />
          <Route path="/Register" element={<Register/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/ReportProblem" element={<ReportProblem/>} />
          {/* <Route path="*" component={Missing} /> */}


        </Routes> }
        
        </>
      </userContext.Provider>
    </>
  );
};

export default App;
