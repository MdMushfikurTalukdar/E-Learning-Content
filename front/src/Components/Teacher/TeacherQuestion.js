import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";

const TeacherQuestion = () => {
  const [loadUpdate, setLoadUpdate] = useState(false);
  const [Question, setQuestion] = useState("");
  const [Correct_Answer, setCorrectionAnswer] = useState("");
  const [Incorrect_Answer1, setIncorrect_Answer1] = useState("");
  const [Incorrect_Answer2, setIncorrect_Answer2] = useState("");
  const [Incorrect_Answer3, setIncorrect_Answer3] = useState("");
  const [allQuestions, setAllQuestions] = useState([]);
  const [questionId, setQuestionId] = useState("");

  const data = {
    Question,
    Correct_Answer,
    Incorrect_Answer1,
    Incorrect_Answer2,
    Incorrect_Answer3,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:5000/api/v1/Question", data)
      .then(function (response) {
        if (response) {
          toast.success("Successfully added question");
          event.target.reset();
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    window.location.reload();
  };

  const allQuestion = async () => {
    const data = await axios.get("http://localhost:5000/api/v1/Question");
    setAllQuestions(data.data.data);
  };

  const deleteQuestion = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/Question/${questionId}`
      );
      swal({
        title: "Success",
        text: res.data.message,
        icon: "success",
      });
    } catch (err) {
      console.log("Error", err.message);
    }
    window.location.reload();
  };

  useEffect(() => {
    setLoadUpdate(true);
    allQuestion();
  }, []);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
       
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Add Quiz</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Add Quiz</li>
              </ul>
            </div>
            <div className="col-auto float-right ml-auto">
              <a
                href="#"
                className="btn add-btn"
                data-bs-toggle="modal"
                data-bs-target="#add_Quiz"
              >
                <i className="fa fa-plus" /> Add Quiz
              </a>
            </div>
          </div>
        </div>

        <table class="table table-striped" style={{ marginTop: "50px" }}>
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Question</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {allQuestions.map((question) => (
              <tr>
                <th scope="row">{question.Question_Id}</th>
                <td>{question.question}</td>
                <td>
                  <div className="dropdown dropdown-action text-right">
                    <a
                      href="#"
                      className="action-icon dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="material-icons">more_vert</i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a
                        className="dropdown-item"
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_question"
                        onClick={() => setQuestionId(question.Question_Id)}
                      >
                        <i className="fa fa-trash-o m-r-5" /> Delete
                      </a>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       
        <div id="add_Quiz" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Quiz</h5>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
               
                <form onSubmit={handleSubmit} className="">

                  <div className="row d-flex flex-column">
                    <div className="col-lg-12">
                      <div class="form-group">
                        <label for="exampleInputEmail1"> Question</label>
                        <input
                          type="text"
                          name="Question"
                          class="form-control border border-dark"
                          placeholder="Question"
                          onChange={(e) => setQuestion(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div class="form-group">
                        <label for="exampleInputEmail1"> Correct Answer</label>
                        <input
                          type="text"
                          name="Correct_Answer"
                          class="form-control border border-dark"
                          placeholder="Correct Answer"
                          onChange={(e) => setCorrectionAnswer(e.target.value)}
                        />
                      </div>
                    </div>
                    <div class="form-group col-lg-12">
                      <label for="exampleInputEmail1"> Incorrect Answer1</label>
                      <input
                        type="text"
                        name="Incorrect_Answer1"
                        class="form-control border border-dark"
                        
                        placeholder="Incorrect Answer"
                        onChange={(e) => setIncorrect_Answer1(e.target.value)}
                      />
                    </div>
                    <div class="form-group col-lg-12">
                      <label for="exampleInputEmail1"> Incorrect Answer2</label>
                      <input
                        type="text"
                        class="form-control border border-dark"
                        name="Incorrect_Answer2"
                        
                        placeholder="Incorrect Answer"
                        onChange={(e) => setIncorrect_Answer2(e.target.value)}
                      />
                    </div>
                    <div class="form-group col-lg-12">
                      <label for="exampleInputEmail1"> Incorrect Answer3</label>
                      <input
                        type="text"
                        name="Incorrect_Answer1"
                        class="form-control border border-dark"
                        
                        placeholder="Incorrect Answer"
                        onChange={(e) => setIncorrect_Answer3(e.target.value)}
                      />
                    </div>
                    <div className="submit-section">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                      >
                        Add
                      </button>
                    </div>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal custom-modal fade"
          id="delete_question"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete Question</h3>
                  <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <a
                        className="btn btn-primary continue-btn"
                        onClick={() => deleteQuestion()}
                      >
                        Delete
                      </a>
                    </div>
                    <div className="col-6">
                      <a
                        href=""
                        data-bs-dismiss="modal"
                        className="btn btn-primary cancel-btn"
                      >
                        Cancel
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherQuestion;
