import React from "react";
import useServer from "../hooks/useServer";
import { Link, useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
const Sidebar = () => {
  const navigate = useNavigate();
  let logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("uid");
    localStorage.removeItem("email");
    Cookies.remove("token");
    sessionStorage.clear();
    navigate("/login");
    
  };
  const uid = localStorage.getItem("uid");
  const location = useLocation();
  let pathname = location.pathname;

  const { TokenInfo } = useServer();
  const role = TokenInfo.role;
  return (
    <>
      {!role == "" ? (
        <>
          <div className="sidebar" id="sidebar">
            <div className="sidebar-inner slimscroll">
              <div id="sidebar-menu" className="sidebar-menu">
                {
                  
                  role == "user" ? (
                    <>
                      <ul>
                        <li className="menu-title">
                          <span>Student</span>
                        </li>
                        <li className="submenu">
                          <a href="#">
                            <i className="la la-rocket" /> <span>Notes</span>{" "}
                            <span className="menu-arrow" />
                          </a>
                          <ul style={{ display: "none" }}>
                            <li>
                              <Link
                                className={
                                  pathname.includes("allNotes") ? "active" : ""
                                }
                                to="/allNotes"
                              >
                                All Notes
                              </Link>
                            </li>
                          </ul>
                        </li>

                        <li className="submenu">
                          <a href="#">
                            <i className="la la-rocket" /> <span>Tutorials</span>{" "}
                            <span className="menu-arrow" />
                          </a>
                          <ul style={{ display: "none" }}>
                            <li>
                              <Link
                                className={
                                  pathname.includes("createVideos") ? "active" : ""
                                }
                                to="/getVideos"
                              >
                                All Videos
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li className="submenu">
                          <a href="#">
                            <i className="la la-rocket" /> <span>Exam</span>{" "}
                            <span className="menu-arrow" />
                          </a>
                          <ul style={{ display: "none" }}>
                            <li>
                              <Link
                                className={
                                  pathname.includes("exam") ? "active" : ""
                                }
                                to="/exam"
                              >
                                Quiz
                              </Link>
                            </li>
                            <li>
                              <Link
                                className={
                                  pathname.includes("evaluation")
                                    ? "active"
                                    : ""
                                }
                                to="/evaluation"
                              >
                                Evaluation
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li onClick={logout}>
                          <a href="">
                            <i className="la la-sign-out" />
                            <span>Log Out</span>
                          </a>
                        </li>
                      </ul>
                    </>
                  ) : 
                    role == "admin" ? (
                      <>
                        <ul>
                          <li className="menu-title">
                            <span>Teacher</span>
                          </li>
                          <li className="submenu">
                            <a href="#">
                              <i className="la la-rocket" /> <span>All Course</span>{" "}
                              <span className="menu-arrow" />
                            </a>
                            <ul style={{ display: "none" }}>
                              <li>
                                <Link
                                  className={
                                    pathname.includes("add-Course") ? "active" : ""
                                  }
                                  to="/add-Course"
                                >
                                  Add Course
                                </Link>
                              </li>
                            </ul>
                          </li>
                          <li className="submenu">
                            <a href="#">
                              <i className="la la-rocket" /> <span>Notes</span>{" "}
                              <span className="menu-arrow" />
                            </a>
                            <ul style={{ display: "none" }}>
                              <li>
                                <Link
                                  className={
                                    pathname.includes("createNotes") ? "active" : ""
                                  }
                                  to="/createNotes"
                                >
                                  Add Notes
                                </Link>
                              </li>
                            </ul>
                          </li>

                          <li className="submenu">
                            <a href="#">
                              <i className="la la-rocket" /> <span>Videos</span>{" "}
                              <span className="menu-arrow" />
                            </a>
                            <ul style={{ display: "none" }}>
                              <li>
                                <Link
                                  className={
                                    pathname.includes("createVideos") ? "active" : ""
                                  }
                                  to="/createVideos"
                                >
                                  Add Videos
                                </Link>
                              </li>
                             
                            </ul>
                          </li>
                          <li className="submenu">
                            <a href="#">
                              <i className="la la-rocket" /> <span>Exam</span>{" "}
                              <span className="menu-arrow" />
                            </a>
                            <ul style={{ display: "none" }}>
                              <li>
                                <Link
                                  className={
                                    pathname.includes("addquiz") ? "active" : ""
                                  }
                                  to="/addquiz"
                                >
                                  Add Quiz
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className={
                                    pathname.includes("evaluation")
                                      ? "active"
                                      : ""
                                  }
                                  to="/evaluation"
                                >
                                  Evaluation
                                </Link>
                              </li>
                            </ul>
                          </li>

                        </ul>
                      </>
                    ) : (
                     
                      ""
                    )
                }
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Sidebar;
