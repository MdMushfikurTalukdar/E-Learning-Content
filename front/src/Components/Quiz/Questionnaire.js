import React from "react";
import { toast } from "react-toastify";
import "./Questionnaire.css";

const Questionnaire = ({
  handleAnswer,
  handleNextQuestion,
  showAnswers,
  data: { question, correct_answer, answers },
}) => {
  const notifyToPickAnswer = () =>
    toast("Pick an answer! 😛", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });

  return (
    <div className="main">
      <div className=" text-purple-800 p-10 rounded shadow-md">
        <h2
          className="fs-1 mb-4"
          dangerouslySetInnerHTML={{ __html: question }}
        />
      </div>
      <div className=" mt-6">
        {answers.map((answer) => {
          const textColor = showAnswers
            ? answer === correct_answer
              ? "text-success"
              : "text-danger"
            : "text-purple";
          return (
            <button
              className={`bg-white ${textColor}
              p-4 fs-4 rounded shadow col-sm-6`}
              onClick={() => handleAnswer(answer)}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          );
        })}
      </div>
      <button
        onClick={showAnswers ? handleNextQuestion : notifyToPickAnswer}
        className={` ${showAnswers ? "bg-purple" : "bg-secondary"} text-white
              p-4 fs-4 rounded shadow mt-6 sub mt-2`}
      >
        Next Question
      </button>
    </div>
  );
};

export default Questionnaire;
