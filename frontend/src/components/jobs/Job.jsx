import "./style.css";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../../App";
import {
  ImBriefcase,
  ImLocation,
  ImClock,
  ImHome2,
  ImFilter,
} from "react-icons/im";
import { CgChevronRight } from "react-icons/cg";
import moment from "moment";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Collapse from "@mui/material/Collapse";
import { Pagination } from "antd";

import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, capitalize } from "@mui/material";

const Job = () => {
  let LS = JSON.parse(localStorage.getItem("post"));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [qualifications, setQualifications] = useState([]);
  const [skills, setSkills] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [responsibilities, setResponsibilities] = useState([]);
  const [typeOfJob, setTypeOfJob] = useState("");
  const [hours, sethHours] = useState("");
  const [locationWork, setLocationWork] = useState("");
  const [country, setCountry] = useState("");
  const [experience, setExperience] = useState({});
  const [salary, setSalary] = useState({});
  const [company, setCompanyInfo] = useState({});
  const [status, setStatus] = useState("");
  const [showBtns, SetShowBtns] = useState(false);
  const [limit, SetLimit] = useState(4);
  const [page, SetPage] = useState(1);
  const { token } = useContext(userContext);
  const navigate = useNavigate();
  const { posts, setPosts } = useContext(userContext);
  const { id, setID } = useContext(userContext);
  const { applications, setApplications } = useContext(userContext);


  const Apply = () => {
    navigate(`/${id}/apply`);
  };

  const getAllJobs = () => {
    axios
      .get("http://localhost:5000/jobs", {
        params: {
          limit: limit,
          page: page,
        },
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

  useEffect(() => {
    getAllJobs();
  }, []);
  return (
    <>
      <div>
        <p className="paraOfCardsJobs">Recently Jobs</p>
      </div>

      {token ? (
        <div className="ContainerJobs">
          <div class="cards-jobs ">
            {posts.map((ele, i) => {
              return (
                <div
                  class="cards"
                  key={i}
                  onClick={(e) => {
                    const post = posts[i];
                    console.log(post);
                    setTitle(post.title);
                    setDescription(post.description);
                    setResponsibilities(ele.responsibilities);
                    setQualifications(ele.qualifications);
                    setBenefits(ele.benefits);
                    setSkills(ele.skills);
                    setTypeOfJob(post.typeOfJob);
                    sethHours(post.workingHours);
                    setLocationWork(post.locationWork);
                    setCountry(post.country);
                    setExperience(post.experience);
                    setSalary(post.salary);
                    setCompanyInfo(post.company);
                    setStatus(post.status);
                    setID(post._id);
                    setApplications(post.applications)
                  }}
                >
                  <Card sx={{ width: 400, cursor: "pointer" }}>
                    <CardHeader
                      sx={{
                        variant: "h1",
                        color: "text.primary",
                        fontSize: 20,
                        fontWeight: 800,
                        textTransform: "capitalize",
                      }}
                      avatar={<Avatar aria-label="findly">F</Avatar>}
                      // action={
                      //   <IconButton aria-label="settings">
                      //     <MoreVertIcon />
                      //   </IconButton>
                      // }

                      title={ele?.title ?? " "}
                      subheader={LS[0]?.company.name}
                    />
                    <Typography
                      sx={{
                        marginLeft: 2,
                        marginBottom: 2,
                        color: "text.secondary",
                        display: "inline-flex",
                        gap: 10,
                      }}
                    >
                      <Typography>
                        {" "}
                        Posting Date :{" "}
                        {moment(ele?.postingDate).format("YYYY-MM-DD") ?? " "}
                      </Typography>
                      <Typography
                        sx={{
                          position: "relative",
                          bottom: 2,
                          left: 60,
                          float: "right",
                        }}
                      >
                        {" "}
                        {ele?.status ?? " "}
                      </Typography>
                    </Typography>

                    {/* <CardHeader
                      sx={{
                         variant: "h5",
                        color: "text.secondary",
                        fontSize: 10,
                        className: "status",
                      }}
                      title={ele?.status ?? " "}
                      subheader={
                        moment(ele?.postingDate).format("YYYY-MM-DD") ?? " "
                      }
                    /> */}
                    <CardContent>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.primary",
                          fontSize: 16,
                          position: "relative",
                          bottom: 12,
                          textTransform: "capitalize",
                          marginBottom: 2,
                          display: "inline-flex",
                          gap: 1,
                        }}
                      >
                        <ImHome2 /> {"    "}
                        <Typography
                          sx={{
                            position: "relative",
                            bottom: 3,
                          }}
                        >
                          {ele.typeOfJob ? ele.typeOfJob : ""}
                        </Typography>
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.primary",
                          fontSize: 16,
                          position: "relative",
                          bottom: 12,
                          textTransform: "capitalize",
                          marginBottom: 2,
                          display: "flex",
                          flexDirection: "row",
                          gap: 1,
                        }}
                      >
                        <ImClock />
                        {"  "}
                        <Typography
                          sx={{
                            position: "relative",
                            bottom: 3,
                          }}
                        >
                          {ele.workingHours ? ele.workingHours + " hrs" : " "}
                        </Typography>
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.primary",
                          fontSize: 16,
                          position: "relative",
                          bottom: 12,
                          textTransform: "capitalize",
                          marginBottom: 2,
                          display: "flex",
                          flexDirection: "row",
                          gap: 1,
                        }}
                      >
                        <ImBriefcase />
                        {"  "}
                        <Typography
                          sx={{
                            position: "relative",
                            bottom: 3,
                          }}
                        >
                          {ele.experience.minYears && ele.experience.maxYears
                            ? ele.experience.minYears +
                              " - " +
                              ele.experience.maxYears +
                              " yrs"
                            : " "}
                        </Typography>
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.primary",
                          fontSize: 16,
                          position: "relative",
                          bottom: 12,
                          textTransform: "capitalize",
                          marginBottom: 2,
                          display: "flex",
                          flexDirection: "row",
                          gap: 1,
                        }}
                      >
                        <ImLocation /> {"  "}
                        <Typography
                          sx={{
                            position: "relative",
                            bottom: 3,
                          }}
                        >
                          {ele.country ? ele.country + " - " : " "}{" "}
                          {ele.locationWork ? ele.locationWork : " "}
                        </Typography>
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>

                    {/* <Collapse>
                      <CardContent>
                        <Typography sx={{ marginBottom: 2 }}>
                          Method:
                        </Typography>
                        <Typography sx={{ marginBottom: 2 }}>
                          Heat 1/2 cup of the broth in a pot until simmering,
                          add saffron and set aside for 10 minutes.
                        </Typography>
                        <Typography sx={{ marginBottom: 2 }}>
                          Heat oil in a (14- to 16-inch) paella pan or a large,
                          deep skillet over medium-high heat. Add chicken,
                          shrimp and chorizo, and cook, stirring occasionally
                          until lightly browned, 6 to 8 minutes. Transfer shrimp
                          to a large plate and set aside, leaving chicken and
                          chorizo in the pan. Add pimentón, bay leaves, garlic,
                          tomatoes, onion, salt and pepper, and cook, stirring
                          often until thickened and fragrant, about 10 minutes.
                          Add saffron broth and remaining 4 1/2 cups chicken
                          broth; bring to a boil.
                        </Typography>
                        <Typography sx={{ marginBottom: 2 }}>
                          Add rice and stir very gently to distribute. Top with
                          artichokes and peppers, and cook without stirring,
                          until most of the liquid is absorbed, 15 to 18
                          minutes. Reduce heat to medium-low, add reserved
                          shrimp and mussels, tucking them down into the rice,
                          and cook again without stirring, until mussels have
                          opened and rice is just tender, 5 to 7 minutes more.
                          (Discard any mussels that don&apos;t open.)
                        </Typography>
                        <Typography>
                          Set aside off of the heat to let rest for 10 minutes,
                          and then serve.
                        </Typography>
                      </CardContent>
                    </Collapse> */}
                  </Card>
                </div>
              );
            })}
          </div>

          <div className="jobCardDetails shadow rounded">
            {title && description && qualifications && responsibilities ? (
              <div class="card-body-details ">
                <Card
                  sx={{
                    width: 1000,
                    cursor: "pointer",
                  }}
                >
                  <CardHeader
                    sx={{
                      variant: "h1",
                      color: "text.primary",
                      fontSize: 20,
                      fontWeight: 800,
                      textTransform: "capitalize",
                    }}
                    avatar={<Avatar aria-label="findly">F</Avatar>}
                    // action={
                    //   <IconButton aria-label="settings">
                    //     <MoreVertIcon />
                    //   </IconButton>
                    // }
                    title={title}
                  />
                  <Typography
                    sx={{
                      marginLeft: 2,
                      marginBottom: 2,
                      color: "text.secondary",
                    }}
                  >
                    <Typography>
                      {" "}
                      {company?.name} {" - "}
                      {company?.companyType}
                    </Typography>
                  </Typography>

                  <CardContent>
                    <Typography sx={{}}>
                      <Typography
                        sx={{
                          color: "text.primary",
                          fontSize: 20,
                          marginBottom: 1,
                        }}
                      >
                        {" "}
                        Job Description
                      </Typography>{" "}
                      {description}
                    </Typography>

                    <Typography sx={{}}>
                      <Typography
                        sx={{
                          color: "text.primary",
                          fontSize: 20,
                          marginBottom: 1,
                        }}
                      >
                        {" "}
                        Qualifications
                      </Typography>{" "}
                      {qualifications.map((e, i) => {
                        return (
                          <p className="card-requirements" key={i}>
                            {" - "}
                            {e}
                          </p>
                        );
                      })}
                    </Typography>

                    <Typography sx={{}}>
                      <Typography
                        sx={{
                          color: "text.primary",
                          fontSize: 20,
                          marginBottom: 1,
                        }}
                      >
                        {" "}
                        Responsibilities
                      </Typography>{" "}
                      {responsibilities.map((e, i) => {
                        return (
                          <p className="card-responsibilities" key={i}>
                            {" - "}
                            {e}
                          </p>
                        );
                      })}
                    </Typography>

                    <Typography sx={{}}>
                      <Typography
                        sx={{
                          color: "text.primary",
                          fontSize: 20,
                          marginBottom: 1,
                        }}
                      >
                        {" "}
                        Skills
                      </Typography>{" "}
                      {skills.map((e, i) => {
                        return (
                          <p className="card-skills" key={i}>
                            {" - "}
                            {e}
                          </p>
                        );
                      })}
                    </Typography>

                    <Typography sx={{}}>
                      <Typography
                        sx={{
                          color: "text.primary",
                          fontSize: 20,
                          marginBottom: 1,
                        }}
                      >
                        {" "}
                        Benefits
                      </Typography>{" "}
                      {benefits.map((e, i) => {
                        return (
                          <p className="card-benefits" key={i}>
                            {" - "}
                            {e}
                          </p>
                        );
                      })}
                    </Typography>
                    {/* <CardHeader
                      sx={{
                         variant: "h5",
                        color: "text.secondary",
                        fontSize: 10,
                        className: "status",
                      }}
                      title={ele?.status ?? " "}
                      subheader={
                        moment(ele?.postingDate).format("YYYY-MM-DD") ?? " "
                      }
                    /> */}

                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.primary",
                        fontSize: 16,
                        textTransform: "capitalize",
                        marginBottom: 2,
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                      }}
                    >
                      <ImHome2 /> {"    "}
                      <Typography
                        sx={{
                          position: "relative",
                          bottom: 3,
                        }}
                      >
                        {typeOfJob ? typeOfJob : ""}
                      </Typography>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.primary",
                        fontSize: 16,
                        position: "relative",
                        bottom: 12,
                        textTransform: "capitalize",
                        marginBottom: 1,
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                      }}
                    >
                      <ImClock />
                      {"  "}
                      <Typography
                        sx={{
                          position: "relative",
                          bottom: 3,
                        }}
                      >
                        {hours ? hours + " hrs" : " "}
                      </Typography>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.primary",
                        fontSize: 16,
                        position: "relative",
                        bottom: 12,
                        textTransform: "capitalize",
                        marginBottom: 1,
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                      }}
                    >
                      <ImBriefcase />

                      <Typography
                        sx={{
                          position: "relative",
                          bottom: 3,
                        }}
                      >
                        {experience.minYears && experience.maxYears
                          ? experience.minYears +
                            " - " +
                            experience.maxYears +
                            " yrs"
                          : " "}
                      </Typography>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.primary",
                        fontSize: 16,
                        position: "relative",
                        bottom: 12,
                        textTransform: "capitalize",
                        marginBottom: 1,
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                      }}
                    >
                      <ImLocation /> {"  "}
                      <Typography
                        sx={{
                          position: "relative",
                          bottom: 3,
                        }}
                      >
                        {country ? country + " - " + locationWork : ""}
                      </Typography>
                    </Typography>

                    <Button
                      onClick={Apply}
                      sx={{
                        border: "1px solid #ccc",
                        marginBottom: 2,
                      }}
                      variant="primary"
                    >
                      Apply Now
                    </Button>
                    <br />
                    <Typography sx={{ marginBottom: 3 }}>
                      About Company : <br />
                      <Typography sx={{ marginTop: 1, fontSize: 12 }}>
                        {" "}
                        OCC Findly Ltd. <br />
                      </Typography>
                      <Typography sx={{ fontSize: 12 }}>
                        {" "}
                        Job Source:{" "}
                        <Link href="www.linkedin.com">www.linkedin.com</Link>
                      </Typography>
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="card-body-details">
                <Card sx={{ width: 1000, cursor: "pointer" }}>
                  <CardHeader
                    sx={{
                      variant: "h1",
                      color: "text.primary",
                      fontSize: 20,
                      fontWeight: 800,
                      textTransform: "capitalize",
                    }}
                    avatar={<Avatar aria-label="findly">F</Avatar>}
                    // action={
                    //   <IconButton aria-label="settings">
                    //     <MoreVertIcon />
                    //   </IconButton>
                    // }
                    title={posts[0]?.title}
                  />

                  <Typography
                    sx={{
                      marginLeft: 2,
                      marginBottom: 2,
                      color: "text.secondary",
                    }}
                  >
                    <Typography>
                      {" "}
                      {LS[0]?.company.name} {" - "}
                      {LS[0]?.company.companyType}
                    </Typography>
                  </Typography>

                  <CardContent>
                    <Typography sx={{}}>
                      <Typography
                        sx={{
                          color: "text.primary",
                          fontSize: 20,
                          marginBottom: 1,
                        }}
                      >
                        {" "}
                        Job Description
                      </Typography>{" "}
                      {LS[0]?.description}
                    </Typography>

                    <Typography sx={{}}>
                      <Typography
                        sx={{
                          color: "text.primary",
                          fontSize: 20,
                          marginBottom: 1,
                        }}
                      >
                        {" "}
                        Qualifications
                      </Typography>{" "}
                      {posts[0]?.qualifications.map((e, i) => {
                        return (
                          <p className="card-requirements" key={i}>
                            {" - "}
                            {e}
                          </p>
                        );
                      })}
                    </Typography>

                    <Typography sx={{}}>
                      <Typography
                        sx={{
                          color: "text.primary",
                          fontSize: 20,
                          marginBottom: 1,
                        }}
                      >
                        {" "}
                        Responsibilities
                      </Typography>{" "}
                      {posts[0]?.responsibilities.map((e, i) => {
                        return (
                          <p className="card-responsibilities" key={i}>
                            {" - "}
                            {e}
                          </p>
                        );
                      })}
                    </Typography>

                    <Typography sx={{}}>
                      <Typography
                        sx={{
                          color: "text.primary",
                          fontSize: 20,
                          marginBottom: 1,
                        }}
                      >
                        {" "}
                        Skills
                      </Typography>{" "}
                      {posts[0]?.skills.map((e, i) => {
                        return (
                          <p className="card-skills" key={i}>
                            {" - "}
                            {e}
                          </p>
                        );
                      })}
                    </Typography>

                    <Typography sx={{}}>
                      <Typography
                        sx={{
                          color: "text.primary",
                          fontSize: 20,
                          marginBottom: 1,
                        }}
                      >
                        {" "}
                        Benefits
                      </Typography>{" "}
                      {posts[0]?.benefits.map((e, i) => {
                        return (
                          <p className="card-benefits" key={i}>
                            {" - "}
                            {e}
                          </p>
                        );
                      })}
                    </Typography>
                    {/* <CardHeader
                      sx={{
                         variant: "h5",
                        color: "text.secondary",
                        fontSize: 10,
                        className: "status",
                      }}
                      title={ele?.status ?? " "}
                      subheader={
                        moment(ele?.postingDate).format("YYYY-MM-DD") ?? " "
                      }
                    /> */}

                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.primary",
                        fontSize: 16,
                        textTransform: "capitalize",
                        marginBottom: 2,
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                      }}
                    >
                      <ImHome2 /> {"    "}
                      <Typography
                        sx={{
                          position: "relative",
                          bottom: 3,
                        }}
                      >
                        {posts[0]?.typeOfJob ? posts[0]?.typeOfJob : ""}
                      </Typography>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.primary",
                        fontSize: 16,
                        position: "relative",
                        bottom: 12,
                        textTransform: "capitalize",
                        marginBottom: 1,
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                      }}
                    >
                      <ImClock />
                      {"  "}
                      <Typography
                        sx={{
                          position: "relative",
                          bottom: 3,
                        }}
                      >
                        {posts[0]?.workingHours
                          ? posts[0]?.workingHours + " hrs"
                          : " "}
                      </Typography>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.primary",
                        fontSize: 16,
                        position: "relative",
                        bottom: 12,
                        textTransform: "capitalize",
                        marginBottom: 1,
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                      }}
                    >
                      <ImBriefcase />

                      <Typography
                        sx={{
                          position: "relative",
                          bottom: 3,
                        }}
                      >
                        {posts[0]?.experience.minYears}
                        {" - "}
                        {posts[0]?.experience.maxYears + " yrs"}
                      </Typography>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.primary",
                        fontSize: 16,
                        position: "relative",
                        bottom: 12,
                        textTransform: "capitalize",
                        marginBottom: 1,
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                      }}
                    >
                      <ImLocation /> {"  "}
                      <Typography
                        sx={{
                          position: "relative",
                          bottom: 3,
                        }}
                      >
                        {posts[0]?.country ? posts[0]?.country + " - " : " "}
                        {posts[0]?.locationWork ? posts[0]?.locationWork : " "}
                      </Typography>
                    </Typography>

                    <Button
                      onClick={(e) => {
                        navigate(`/${posts[0]?._id}/apply`);
                      }}
                      sx={{
                        border: "1px solid #ccc",
                        marginBottom: 2,
                      }}
                      variant="primary"
                    >
                      Apply Now
                    </Button>
                    <br />
                    <Typography sx={{ marginBottom: 3 }}>
                      About Company : <br />
                      <Typography sx={{ marginTop: 1, fontSize: 12 }}>
                        {" "}
                        OCC Findly Ltd. <br />
                      </Typography>
                      <Typography sx={{ fontSize: 12 }}>
                        {" "}
                        Job Source:{" "}
                        <Link href="www.linkedin.com">www.linkedin.com</Link>
                      </Typography>
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            )}
            <div className=""></div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="noPosts">
            <h2 className="header" data-text="404">
              404
            </h2>
            <h4 className="opps" data-text="Opps! Page not found">
              Opps! Page not found
            </h4>
            <p>
              Sorry, the page you're looking for doesn't exist. If you think
              something is broken, report a problem.
            </p>
            <div class="btns">
              <a href="/signup-login">Return login</a>
              <a href="/ReportProblem">Report problem</a>
            </div>
          </div>
        </div>
      )}
      {/* page={page} onChange={handleChange} */}

      {token ? (
        <Pagination
          align="center"
          defaultCurrent={1}
          total={500}
          onChange={(e) => {
            SetPage(parseInt(e));
            getAllJobs();
          }}
        />
      ) : (
        ""
      )}

      <div class="footer-dark">
        <footer>
          <div class="container">
            <div class="row">
              <div class="col-sm-6 col-md-3 item">
                <h3>Services</h3>
                <ul>
                  <li>
                    <a href="#">Web design</a>
                  </li>
                  <li>
                    <a href="#">Development</a>
                  </li>
                  <li>
                    <a href="#">Hosting</a>
                  </li>
                </ul>
              </div>
              <div class="col-sm-6 col-md-3 item">
                <h3>About</h3>
                <ul>
                  <li>
                    <a href="#">Company</a>
                  </li>
                  <li>
                    <a href="#">Team</a>
                  </li>
                  <li>
                    <a href="#">Careers</a>
                  </li>
                </ul>
              </div>
              <div class="col-md-6 item text">
                <h3>Findly LTD. Company</h3>
                <p>
                  Praesent sed lobortis mi. Suspendisse vel placerat ligula.
                  Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam
                  quis tristique lectus. Aliquam in arcu eget velit pulvinar
                  dictum vel in justo.
                </p>
              </div>
            </div>
            <p class="copyright">Findly LTD. Company © 2018</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Job;
