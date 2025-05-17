import React, { useContext, useEffect, useState } from "react";
import App, { userContext } from "../../App";
import "./style.css";
import axios from "axios";
import {
  ImBriefcase,
  ImClock,
  ImFilter,
  ImHome2,
  ImLocation,
  ImEqualizer,
} from "react-icons/im";
import { CgChevronRight } from "react-icons/cg";
import moment from "moment";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Collapse from "@mui/material/Collapse";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import { Pagination } from "antd";

const Home = () => {
  const { token } = useContext(userContext);
  const navigate = useNavigate();
  const { posts, setPosts } = useContext(userContext);
  const [filterResults, SetFilter] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [limit, SetLimit] = useState(4);
  const [page, SetPage] = useState(1);
  const [input, SetInput] = useState(false);
  const [msg, SetMsgSearch] = useState("No Search Results");
  const [showBtns, SetShowBtns] = useState(false);
  const [salaryMinRange, SetMinSalary] = useState("");
  const [salaryMaxRange, SetMaxSalary] = useState("");

  let LS = JSON.parse(localStorage.getItem("post"));
console.log(searchResults.length)
  const Apply = (id) => {
    navigate(`/${id}/apply`);
  };

  const Search = async () => {
    await axios
      .get(`http://localhost:5000/jobs/search`, {
        params: {
          limit: limit,
          page: page,
          search: searchInput,
        },
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .then((res) => {
        console.log(res.data);
        setSearchResults(res.data.jobs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const SalaryFilter = async () => {
    await axios
      .get(
        `http://localhost:5000/jobs/filter/` +
          salaryMinRange +
          "/" +
          salaryMaxRange,
        {
          params: {
            limit: limit,
            page: page,
            search: searchInput,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);

        SetFilter({ ...filterResults, filter: res.data.result });
      })
      .catch((err) => {
        console.log(err);
      });
    SetMsgSearch("");
  };

  const filter = async (criteria) => {
    await axios
      .get(`http://localhost:5000/jobs/filter/` + criteria, {
        params: {
          limit: limit,
          page: page,
          search: searchInput,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        SetFilter({ ...filterResults, filter: res.data.result });
      })
      .catch((err) => {
        console.log(err);
      });
    SetMsgSearch("");
  };

  return (
    <>
      <>
        <div className="containerHome">
          <div className="search_filter">
            <div className="intro_job">
              <span className="we-are-your-future">we are your future</span>
              <h2 className="JobWithFindly">
                Get Your Desired Job With Findly.{" "}
              </h2>
              <p className="Gets-jobs">
                Gets jobs, create trackable resumes and enrich your applications
              </p>
            </div>
            <div>
              {" "}
              <input
                onInput={(e) => {
                  console.log(e.target.value);
                  setSearchInput(e.target.value);
                  Search();
                  SetInput(!input);
                  //         <div className="cards_results">
                  //           {/* {searchResults
                  // ? searchResults.map((e, i) => {
                  //    <p>{e}</p>
                  //   })
                  // : "hi"} */}
                  //         </div>;
                }}
                className="input_Search"
                type="search"
                placeholder="Job titles, Keywords..."
                aria-label="Search"
              />
            </div>
            <div>
              <button
                className="filterBtn"
                onClick={(e) => {
                  SetShowBtns(true);
                }}
              >
                <button class="setting-btn">
                  <span class="bar bar1"></span>
                  <span class="bar bar2"></span>
                  <span class="bar bar1"></span>
                </button>
                <p className="text-filter">
                  <span>All Filters</span>
                </p>
              </button>
            </div>

            {showBtns && (
              <>
                <div class="filter-dropDowns">
                  <div class="dropdown">
                    <select
                      className="select typeOfJob"
                      name="typeOfJob"
                      onClick={(e) => {
                        console.log(e.target.value);
                        filter(e.target.value);
                      }}
                    >
                      <option value="" selected disabled>
                        Types Of Job
                      </option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Temporary">Temporary</option>
                      <option value="Internship">Internship</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>

                  <div class="dropdown">
                    <select
                      className="select countries"
                      name="countries"
                      onChange={(e) => {
                        console.log(e.target.value);
                        filter(e.target.value);
                      }}
                    >
                      <option value="" selected disabled>
                        Countries
                      </option>
                      <option value="United States">United States</option>
                      <option value="Afghanistan">Afghanistan</option>
                      <option value="Albania">Albania</option>
                      <option value="Algeria">Algeria</option>
                      <option value="American Samoa">American Samoa</option>
                      <option value="Andorra">Andorra</option>
                      <option value="Angola">Angola</option>
                      <option value="Armenia">Armenia</option>
                      <option value="Aruba">Aruba</option>
                      <option value="Australia">Australia</option>
                      <option value="Brazil">Brazil</option>
                      <option value="British Indian Ocean Territory">
                        British Indian Ocean Territory
                      </option>
                      <option value="Bulgaria">Bulgaria</option>
                      <option value="Burundi">Burundi</option>
                      <option value="Cambodia">Cambodia</option>
                      <option value="Cameroon">Cameroon</option>
                      <option value="Canada">Canada</option>
                      <option value="Denmark">Denmark</option>
                      <option value="Egypt">Egypt</option>
                      <option value="Finland">Finland</option>
                      <option value="France">France</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Germany">Germany</option>
                      <option value="Greece">Greece</option>
                      <option value="India">India</option>
                      <option value="Indonesia">Indonesia</option>
                      <option value="Italy">Italy</option>
                      <option value="Jamaica">Jamaica</option>
                      <option value="Japan">Japan</option>
                      <option value="Jordan">Jordan</option>
                      <option value="Qatar">Qatar</option>
                      <option value="Qatar">Saudi Arabia</option>
                      <option value="United Arab Emirates">
                        United Arab Emirates
                      </option>
                    </select>
                  </div>

                  <div className="min-max">
                    <div className="min">
                      <label htmlFor="Min">
                        Min:
                        <span className="min-value">
                          {salaryMinRange ? salaryMinRange : "290"}
                        </span>
                      </label>
                    </div>
                    <div className="max">
                      <label htmlFor="Max">
                        Max:
                        <span className="max-value">
                          {salaryMaxRange ? salaryMaxRange : "10000"}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div class="salaryRange">
                    <input
                      type="range"
                      className="range"
                      name="salary"
                      min="290"
                      max="5000"
                      onChange={(e) => {
                        console.log(e);
                        SetMinSalary(e.target.value);
                      }}
                    />
                    <input
                      type="range"
                      className="range"
                      name="salary"
                      min="5001"
                      max="10000"
                      onChange={(e) => {
                        console.log(e);
                        SetMaxSalary(e.target.value);
                        SalaryFilter(
                          Number(salaryMinRange),
                          Number(salaryMaxRange)
                        );
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="bg-img"></div>
        </div>
        <hr />
      </>

      <div className="cards-results-search">
        <div>
          <h2 className="search-results"> Search Results</h2>
        </div>

        {input && token ? (
          <>
            <div className="cards-jobs">
              {searchResults?.map((ele, i) => {
                return (
                  <div
                    className="cards"
                    key={i}
                    onClick={(e) => {
                      e.preventDefault();
                      Apply(ele._id);
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
                    </Card>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <p className="no-search-results"> {msg}</p>
        )}

        {token ? (
          <>
            {filterResults.filter?.map((ele, i) => {
              return (
                <>
                  <div
                    className="cards"
                    key={i}
                    onClick={(e) => {
                      Apply(ele._id);
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
                    </Card>
                  </div>
                </>
              );
            })}
          </>
        ) : (
          <p></p>
        )}
      </div>
      {token ? (
        <Pagination
          align="center"
          defaultCurrent={1}
          total={200}
          onChange={(e) => {
            console.log(e)
            SetPage(parseInt(e));
            {
              {input ? Search() : filter();}
            }
          }}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
