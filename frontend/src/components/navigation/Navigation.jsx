import "./style.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { userContext } from "react";

const Navigation = () => {
  // const {token,setToken} = useContext(userContext);
  // console.log(token)

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        {/* <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button> */}
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <span className="logo">Find<span class="ly">ly</span> </span>
          <ul class="navbar-nav">
            <li class="nav-item ">
              <a class="nav-link" href="#">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Link
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Disabled
              </a>
            </li>
          </ul>
        </div>
        <input
          class="input_Search"
          type="search"
          placeholder="Job titles, Keywords..."
          aria-label="Search"
        />
      </nav>
    </>
  );
};

export default Navigation;
