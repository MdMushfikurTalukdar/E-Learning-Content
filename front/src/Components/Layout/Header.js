import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useServer from "../hooks/useServer";
import Logo from "../assets/img/logo.png";
import Cookies from "js-cookie";
const Header = () => {
  const location = useLocation();
  const { User_Info } = useServer();
  const uid = localStorage.getItem("uid");

  let logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("uid");
    localStorage.removeItem("email");
    Cookies.remove("token");
    sessionStorage.clear();
    window.location.href = "/";
  };

  let pathname = location.pathname;

  useEffect(() => {
    let firstload = localStorage.getItem("firstload1");
    if (firstload === "true") {
      setTimeout(function () {
        window.location.reload(1);
        localStorage.removeItem("firstload1");
      }, 1000);
    }
  });
 

  const { TokenInfo } = useServer();
  const role = TokenInfo.role;

  return (
    <>
      {!role == "" ? (
        <>
          <div className="header">
            <div className="header-left">
              <a href="/" className="logo">
                <img src={Logo} width={40} height={40} alt />
              </a>
              <a href="/" className="logo2">
                <img src={Logo} width={40} height={40} alt />
              </a>
            </div>
            <a id="toggle_btn" href="#!">
              <span className="bar-icon">
                <span />
                <span />
                <span />
              </span>
            </a>
            <div className="page-title-box">
              <Link to="/">
                <h3>E-L Content</h3>
              </Link>
            </div>
            <a id="mobile_btn" className="mobile_btn" href="#sidebar">
              <i className="fa fa-bars" />
            </a>
            <ul className="nav user-menu">
              <li className="nav-item">
                <div className="top-nav-search">
                  <a href="#!" className="responsive-search">
                    <i className="fa fa-search" />
                  </a>
                  <form action="search.html">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Search here"
                    />
                    <button className="btn" type="submit">
                      <i className="fa fa-search" />
                    </button>
                  </form>
                </div>
              </li>

              <li className="nav-item dropdown has-arrow main-drop">
                <a
                  href="#"
                  className="dropdown-toggle nav-link"
                  data-bs-toggle="dropdown">
                  <span className="user-img">
                   
                    <span className="status online" />
                  </span>
                  <span
                    style={{ marginLeft: "10px", textTransform: "capitalize" }}>
                    {User_Info.User_Name}
                  </span>
                </a>
                <div className="dropdown-menu">
                  
                  <a className="dropdown-item" href="settings.html">
                    Settings
                  </a>
                  <a className="dropdown-item" onClick={logout}>
                    Logout
                  </a>
                </div>
              </li>
            </ul>
            
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Header;
