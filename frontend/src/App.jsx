import React, { useState ,createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import Job from "./components/jobs/Job";
import { Register } from "./components/Register/Register";
import Home from "./components/Home/Home";

import "./App.css";

export const userContext = createContext();

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <>
      <userContext.Provider value={{ token, setToken }}>
        <div className="App">
         <Navigation/>
        </div>
        <>
        { <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/jobs" element={<Job/>} />
          <Route path="/Register" element={<Register/>} />
          
        </Routes> }
        
        </>
      </userContext.Provider>
    </>
  );
};

export default App;
