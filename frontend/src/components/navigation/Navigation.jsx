import './style.css'
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {userContext} from "../App";


export const Navigation = () => {

  const {token,setToken} = useContext(userContext);
  console.log(token)

  return (
    <>
        <Navbar bg="dark" data-bs-theme="dark" style={{ width: "100vw" }}>
          <Nav className="Nav">
            {token ? (
              <>
                {" "}
                <Nav.Link href="/dashboard/:id">Profile</Nav.Link>
                <Nav.Link href="/reports">Reports</Nav.Link>
                <Nav.Link href="/" >Logout</Nav.Link>{" "}
              </>
            ) : (
              <>
                <Nav.Link href="/">Login</Nav.Link>
                <Nav.Link href="#about">About</Nav.Link>
                <Nav.Link href="#contact">Contact</Nav.Link>{" "}
              </>
            )}
          </Nav>
        </Navbar>
      </>
  )
}

