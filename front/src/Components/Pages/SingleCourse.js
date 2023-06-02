import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { public_api } from "../hooks/baseApi";
const SingleCourse = () => {
  const CourseId = useParams();
  let Id = CourseId.Course_Id;
  const [SingleCourse, SetSingleCourse] = useState("");
  // console.log('SingleCourse', SingleCourse);
  const GetSingleCourse = async () => {
    const data = await public_api().get(`Course/${Id}`);
    SetSingleCourse(data.data.data[0]);
  };

  useEffect(() => {
    GetSingleCourse();
  }, [Id]);

  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-3">
                <div className="row no-gutters">
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">Course Name : {" "}{SingleCourse.Course_Name}</h5>
                      <span><span style={{ fontWeight: 'bolder' }}>Course Category:</span> {" "} {SingleCourse.Course_Category}</span>
                      <p><span style={{ fontWeight: 'bolder' }}>Course Session:</span> {" "} {SingleCourse.Course_Session}</p>
                      <p className="card-text">
                        <span style={{ fontWeight: 'bolder' }}>Course Description :</span><br/>{SingleCourse.Course_Description}
                      </p>
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

export default SingleCourse;
