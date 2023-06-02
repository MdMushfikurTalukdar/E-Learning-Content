// import { ToastContainer } from "react-toastify";
import { ToastContainer } from "react-toastify";
import QuizStartForm from "./QuizStartForm";


const QuizInfo = ({ player, id, subject, setSubject, setPlayer, setId }) => {
  return (
    <div className="container">
      <div class="grid grid-cols-2 gap-4">
        <div className="flex flex-col bg-white text-purple-800 p-10 rounded shadow-md">
          <QuizStartForm
            player={player}
            id={id}
            subject={subject}
            setSubject={setSubject}
            setPlayer={setPlayer}
            setId={setId}
          />
        </div>
       
      </div>
      <div className="flex flex-col bg-white text-purple-800 p-2 rounded shadow-md mt-6">
        
      </div>
      <ToastContainer />
    </div>
  );
};

export default QuizInfo;
