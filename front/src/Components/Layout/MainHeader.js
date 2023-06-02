import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";


const MainHeader = () => {
  return (
    <>
      <div className="header">
        <div className="container">
          <div style={{ marginTop: "20px", float: "left" }}>
            <Link to="/">
              <h3 style={{ color: "#fff" }}>E-L Content</h3>
            </Link>
          </div>

          <ul className="nav user-menu">
            <li className="nav-item">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to={"/all-course"}>All Course</Link>
            </li>
            <li className="nav-item">
              <Link to={"/About"}>About Us</Link>
            </li>
            <li className="nav-item">
              <Link to={"/ContactUs"}>Contact Us</Link>
            </li>
            <li className="nav-item">
              <Link to={"/blog"}>Blog</Link>
            </li>
            <li className="nav-item">
              <Link to={"/login"}>Login</Link>
            </li>
          </ul>
          <div className="dropdown mobile-user-menu">
            <a
              className="nav-link"
              href="#"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              <i className="fa fa-bars" />
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <a className="dropdown-item" href="/">
                Home
              </a>
              <a className="dropdown-item" href="/all-course">
                All Course
              </a>
              <a className="dropdown-item" href="/About">
                About Us
              </a>
              <a className="dropdown-item" href="/ContactUs">
                Contact Us
              </a>
              <a className="dropdown-item" href="/blog">
                Blog
              </a>
              <a href="/login" className="dropdown-item">
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainHeader;
