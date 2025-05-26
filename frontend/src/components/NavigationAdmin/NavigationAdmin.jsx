import "./style.css";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import { userContext } from "../../App";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PlaceIcon from "@mui/icons-material/Place";
import LogoutIcon from "@mui/icons-material/Logout";

const NavigationAdmin = () => {
  let arr;
  const navigate = useNavigate();
  const { token, setToken } = useContext(userContext);
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = React.useState(false);

  const { UID } = useContext(userContext);

  const Logout = () => {
    setToken(null);
    localStorage.clear("token");
    navigate("/signup-login");
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List sx={{ anchor: "right" }}>
        {[
          "Add a job",
          "Edit a job",
          "Delete a job",
          "Get All applications ",
          "Get All users",
        ].map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              id={index}
              onClick={(e) => {
                {
                  e.target.innerText === "Add a job"
                    ? navigate("/AddPost")
                    : e.target.innerText === "Edit a job"
                    ? navigate("/EditPost")
                    : e.target.innerText === "Delete a job"
                    ? navigate(`/DeletePost`)
                    : e.target.innerText === "Get All applications"
                    ? navigate(`/GetAllApplications`)
                    : navigate("/GetAllUsers");
                }
              }}
            >
              <ListItemIcon>
                {(index === 0 || index === 1 || index === 2) ? (
                  <WorkIcon />
                ) : index === 3 ? (
                  <ListAltIcon />
                ) : (
                  <PersonIcon />
                )}
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

      <List>
        <ListItem disablePadding>
          {" "}
          <ListItemButton onClick={Logout}>
            <ListItemIcon>
              {" "}
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={token ? "Log Out" : "Log In / Register"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <>
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
          <div class="container-fluid">
            <span className="logo">
              <a href="/home">
                {" "}
                Find<span className="ly">ly</span>{" "}
              </a>
            </span>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <div>
                <Button onClick={toggleDrawer(true)}>
                  <MenuIcon /> Menu
                </Button>
                <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                  {DrawerList}
                </Drawer>
              </div>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
                <li className="nav-item active ">
                  <Nav.Link className="nav-link" href="/AddPost">
                    Add Job
                  </Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link className="nav-link" href="/EditPost">
                    Edit job
                  </Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link className="nav-link" href={`/DeletePost`}>
                    Delete job
                  </Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link className="nav-link" href="/GetAllApplications">
                    Get All Applications
                  </Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link className="nav-link" href="/GetAllUsers">
                    Get All Users
                  </Nav.Link>
                </li>
              </ul>
              {token ? (
                <button class="button" onClick={Logout}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="svgIcon"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  className="LogIn_Register"
                  onClick={(e) => {
                    navigate("/signup-login");
                  }}
                >
                  Log In / Register
                </button>
              )}
            </div>
          </div>
        </nav>
      </>
    </>
  );
};

export default NavigationAdmin;
