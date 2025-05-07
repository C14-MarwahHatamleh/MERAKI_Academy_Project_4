import React, { useState, createContext } from "react";
import Navigation from "./components/navigation/Navigation";
import Job from "./components/jobs/Job";

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
        <Job/>
        </>
      </userContext.Provider>
    </>
  );
};

export default App;
