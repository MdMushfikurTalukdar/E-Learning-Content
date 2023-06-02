import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GameEnd.css";

import { toast } from "react-toastify";
import { categoriesEnum } from "../../utils/helper";
import { Private_api } from "../hooks/baseApi";
import swal from "sweetalert";

// import { categoriesEnum } from "../utils/helper";

// import { Footer } from "../components";

const saveScore = (player, score, subject, id) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      player: player,
      id: id,
      score: score,
      subject: categoriesEnum[subject],
    }),
  };
  fetch(`${process.env.REACT_APP_API_SERVER}/api/v1/scores`, requestOptions)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

const GameEnd = ({ player, score, subject, id }) => {
  // const navigate = useNavigate();

  // const backToHome = () => {
  //   navigate("/", { replace: true });
  // };

  useEffect(() => {
    saveScore(player, score, subject, id);
    toast("Exam Ended! 😎", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  }, [player, score, subject, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Input: ', field, latestEstimate);
    localStorage.setItem("Student_Id", id);
    try {
      const res = await Private_api().post(`Evaluation`, {
        Course_Name: subject,
        ObtainedGrade: score,
        Student_Id: id,
        Student_Name: player,
      });
      if (res) {
        swal({
          title: "Exam Completed",
          // text: res.data.message,
          icon: "success",
        });
      }
    } catch (err) {
      console.log("err", err.message);
    }
  };

  return (
    <div className=" text-center GameEnd">
      {/* <h1 className="text-2xl text-white font-bold">Name: {`${player}`}</h1>
      <h1 className="text-2xl text-white font-bold">Student Id: {`${id}`}</h1>
      <h1 className="text-2xl text-white font-bold">Marks: {score}</h1>
      <h1 className="text-2xl text-white font-bold">Subject: {subject}</h1> */}
      {/* <button
        className="bg-purple-700 text-white p-4 font-semibold rounded shadow mt-6"
        onClick={backToHome}
      >
        Play Again?
      </button> */}
      {/* <Footer /> */}
      {/* <h1 className="text-success fs-4">Exam Complete</h1> */}
      <form onSubmit={handleSubmit}>
        <input
          className="btn btn-white text-black  fs-1 rounded"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default GameEnd;
