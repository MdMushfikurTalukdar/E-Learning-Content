import axios from "axios";
import React, { useEffect, useState } from "react";

const StudentEvaluation = () => {
  const [evaluations, setEvaluations] = useState([]);
 
  const id = localStorage.getItem("Student_Id");
  const evaluationDetails = async () => {
    const data = await axios
      .get(`http://localhost:5000/api/v1/Evaluation/${id}`)

      .then((res) => {
        console.log("evaluationDetails", res.data.data);
        setEvaluations(res.data.data);
      });
    
  };

  useEffect(() => {
    evaluationDetails();
  }, []);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <div>
          <table class="table table-bordered">
            <thead>
              <tr>
                
                <th scope="col">Student Name</th>
                <th scope="col">Course Name</th>
                <th scope="col">Evaluation Desription</th>
                <th scope="col">Evaluation Status</th>
                <th scope="col">Mark</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentEvaluation;
