import { ToastContainer } from "react-toastify";
import QuizStartForm from "../Quiz/QuizStartForm";

const Exam = ({ player, id, subject, setSubject, setPlayer, setId }) => {
  return (



    <div className="page-wrapper">
      <div className="content container-fluid">

        <div>
          <div class="grid grid-cols-2 gap-4">
            <div className="flex flex-col bg-white text-purple-800 rounded shadow-md">
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
      </div>
    </div>
  );
};

export default Exam;
