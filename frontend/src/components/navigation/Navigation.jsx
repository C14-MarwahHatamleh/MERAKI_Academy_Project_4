import "./style.css";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { userContext } from "react";

const Navigation = () => {
  // const {token,setToken} = useContext(userContext);
  // console.log(token)
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
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

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <span className="logo">
            Find<span className="ly">ly</span>{" "}
          </span>
          <ul className="navbar-nav">
            <li className="nav-item ">
              <Nav.Link className="nav-link" href="#">
                Home
              </Nav.Link>
            </li>
            <li className="nav-item">
              <Nav.Link className="nav-link" href="/jobs">
                Jobs
              </Nav.Link>
            </li>
            <li className="nav-item">
              <Nav.Link className="nav-link" href="#">
                Location
              </Nav.Link>
            </li>
            <li className="nav-item">
              <Nav.Link className="nav-link" href="#">
                Contact
              </Nav.Link>
            </li>
            <li className="nav-item">
              <Nav.Link className="nav-link" href="#">
                Journal
              </Nav.Link>
            </li>
          </ul>
        </div>
        <input
          className="input_Search"
          type="search"
          placeholder="Job titles, Keywords..."
          aria-label="Search"
        />
        <button
          onClick={(e) => {
            navigate("/Register");
          }}
          className="signIn_signUpBtn"
        >
          Login In / Register
        </button>
      </nav>
    </>
  );
};

export default Navigation;
