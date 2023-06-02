import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const QuizStartForm = ({
  player,
  id,
  subject,
  setSubject,
  setPlayer,
  setId,
}) => {
  const navigate = useNavigate();

  const startQuiz = () => {
    if (!player || !subject || !id) {
      toast("Name, Id and subject required! 😛", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    } else {
      navigate("/quiz", { replace: true });
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1>Trivia Quiz App</h1>
      <p>Play a set of 10 interesting MCQs</p>
      <form>
        <div className="row">

          <div className="col-sm-3">
            <div className="form-group">
              <label className="col-form-label">
                Student Name <span className="text-danger"> *</span>
              </label>
              <input
                id="inline-full-name"
                placeholder="Student Name"
                className="form-control"
                type="text"
                value={player}
                onChange={(e) => setPlayer(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-sm-3">
            <div className="form-group">
              <label className="col-form-label">Studen ID</label>
              <span className="text-danger"> *</span>
              <input
                id="inline-full-name"
                className="form-control"
                placeholder="Student Id"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              ></input>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="form-group form-focus select-focus">
              <label className="col-form-label">Subject</label>
              <span className="text-danger"> *</span>
              <select
                id="grid-state"
                className="form-control form-select"
                aria-label="Default select example"
                name="Employee_Name"
              
                required
                onChange={(e) => setSubject(e.target.value)}
              >
                <option>Select subject</option>
                <option>English</option>
                <option>General Knowledge</option>
             
              </select>
            </div>
          </div>

          

          <div class="mt-4">
           
            <div>
              <button className="btn btn-primary" onClick={startQuiz}>
                Take Quiz
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuizStartForm;
