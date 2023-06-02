import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";

const EditEvaluation = () => {
  const { id } = useParams();
  console.log("EditEvaluationId", id);
  const [Student_Name, setStudent_Name] = useState("");
  const [Course_Name, setCourse_Name] = useState("");
  const [Evaluation_Description, setEvaluation_Description] = useState("");
  const [Evaluation_Status, setEvaluation_Status] = useState("");
  const [ObtainedGrade, setObtainedGrade] = useState("");
  const handleUpdate = async (event) => {
    event.preventDefault();
    // console.log('Input: ', field, latestEstimate);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/Evaluation/${id}`,
        {
          Evaluation_Description: Evaluation_Description,
          Evaluation_Status: Evaluation_Status,
        }
      );
      if (res.data.data.status === "Success") {
        toast.success("Successfully updated evaluation information");
        event.target.reset();
        swal({
          title: "Success ",
          text: res.data.message,
          icon: "success",
        });
      }

      console.log("handleUpdate", res);
    } catch (err) {
      console.log("err", err.message);
    }
   
  };
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <div>
          <form onClick={handleUpdate}>
            <div className="row d-flex flex-column">
              
              <div class="form-group col-lg-4">
                <label for="exampleInputEmail1"> Evaluation Description</label>
                <textarea
                  type="text"
                  name="description"
                  class="form-control border border-dark"
                  
                  onChange={(e) => setEvaluation_Description(e.target.value)}
                />
              </div>
              <div class="form-group col-lg-4">
                <label for="exampleInputEmail1"> Evaluation Status</label>
                <input
                  type="text"
                  class="form-control border border-dark"
                 
                  onChange={(e) => setEvaluation_Status(e.target.value)}
                />
              </div>
              
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary col-lg-4"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEvaluation;
