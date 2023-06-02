import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import GameEnd from "./GameEnd";
import Questionnaire from "./Questionnaire";



const Quiz = ({ player, id, subject }) => {
  const navigate = useNavigate();

  if (!player || !subject || !id) navigate("/", { replace: true });

  const QUIZ_API_URL = `http://localhost:5000/api/v1/Question`;

  // const QUIZ_API_URL = `https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple&subject=${subject}`;

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    fetch(QUIZ_API_URL)
      .then((res) => res.json())
      .then((data) => {
        const questions = data.data.map((question) => ({
          ...question,
          answers: [
            question.correct_answer,
            ...question.incorrect_answers,
          ].sort(() => Math.random() - 0.5),
        }));
        setQuestions(questions);
      });
  }, [QUIZ_API_URL]);

  const handleAnswer = (answer) => {
    if (!showAnswers) {
      // prevent double answers
      if (answer === questions[currentIndex].correct_answer) {
        setScore(score + 1);
      }
    }
    setShowAnswers(true);
  };

  const handleNextQuestion = () => {
    setShowAnswers(false);
    setCurrentIndex(currentIndex + 1);
  };

  return questions.length > 0 ? (
    <div className="container">
      <ToastContainer />
      {currentIndex >= questions.length ? (
        <GameEnd player={player} id={id} score={score} subject={subject} />
      ) : (
        <Questionnaire
          data={questions[currentIndex]}
          handleAnswer={handleAnswer}
          showAnswers={showAnswers}
          handleNextQuestion={handleNextQuestion}
        />
      )}
    </div>
  ) : (
    <h2 className="text-2xl text-white font-bold">Loading...</h2>
  );
};

export default Quiz;
