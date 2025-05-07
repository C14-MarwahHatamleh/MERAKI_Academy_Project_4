import React, { useState, createContext } from "react";
import Navbar from "./components/navigation/Navigation";
import Register from "./components/Register/Register";

import "./App.css";

export const userContext = createContext();
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <>
      <userContext.Provider value={{ token, setToken }}>
        <div className="App">
          <Navbar />
        </div>
        <> <Register/></>
       
      </userContext.Provider>
      
    </>
  );
};

export default App;
