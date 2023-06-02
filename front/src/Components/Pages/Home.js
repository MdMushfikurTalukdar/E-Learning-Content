import React from "react";
import { Link } from "react-router-dom";
import Banner from "../assets/img/home1.jpg";
import image5 from "../assets/img/img5.jpg";

const Home = () => {
  return (
    <div id="home">
      <section className="banner">
        <img src={Banner} alt="Picture" />
        <div className="overlay">
          <h2>WELCOME TO E-L CONTENT</h2>
          <p>
            E-Learning Content provides learning materials with digital processes, so that 
            learners can learn every single topic step by step for better visualization.
          </p>
          <div className="submit-section">
            <Link
              to={"/login"}
              className="btn btn-primary submit-btn"
              type="submit">
              Get Started
            </Link>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="row" style={{marginTop:'2rem'}}>
          <div className="col-md-4">
            <img src={image5} alt="Picture" />
          </div>
          <div className="col-md-8 m-t-10">
            <h4 className="m-b-10">
              Online Courses Learn from us to give your child the best
              future.Every online learning platform child has the right to a
              good upbringing.Stay connect
            </h4>
            <h4 className="m-t-10">
              Online Courses Learn from us to give your child the best
              future.Every online learning platform child has the right to a
              good upbringing.Stay connect
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
