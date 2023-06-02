import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const TeacherEvaluation = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [evaluationId, setEvaluationId] = useState("");
  const evaluationDetails = async () => {
    const data = await axios
      .get(`http://localhost:5000/api/v1/Evaluation`)

      .then((res) => {
        console.log("evaluationDetails", res.data.data);
        setEvaluations(res.data.data);
      });
  };

  const deleteEvaluation = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/Evaluation/${evaluationId}`
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
    evaluationDetails();
  }, []);

  return (
   

    <div className="page-wrapper">
      <div className="content container-fluid">
        <div className="d-block mx-auto">
          <table class="table table-striped">
            <thead>
              <tr>
              
                <th scope="col">Student Name</th>
                <th scope="col">Course Name</th>
                <th scope="col">Evaluation Description</th>
                <th scope="col">Evaluation Status</th>
                <th scope="col">Mark</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              {evaluations.map((evaluation) => (
                <tr>
                 
                  <td>{evaluation.Student_Name}</td>
                  <td>{evaluation.Course_Name}</td>
                  <td>{evaluation.Evaluation_Description}</td>
                  <td>{evaluation.Evaluation_Status}</td>
                  <td>{evaluation.ObtainedGrade}</td>
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
                        <Link
                          className="dropdown-item"
                          to={`/editevaluation/${evaluation.Evaluation_Id}`}
                        >
                          <i className="fa fa-pencil m-r-5" /> Edit
                        </Link>
                        <a
                          className="dropdown-item"
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_evaluation"
                          onClick={() =>
                            setEvaluationId(evaluation.Evaluation_Id)
                          }
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
          <div
            className="modal custom-modal fade"
            id="delete_evaluation"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="form-header">
                    <h3>Delete Evaluation</h3>
                    <p>Are you sure want to delete?</p>
                  </div>
                  <div className="modal-btn delete-action">
                    <div className="row">
                      <div className="col-6">
                        <a
                          className="btn btn-primary continue-btn"
                          onClick={() => deleteEvaluation()}
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
    </div>
  );
};

export default TeacherEvaluation;
