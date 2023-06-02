import React from "react";
import moment from "moment";
import useServer from "../../hooks/useServer";
const StudentDashBoard = () => {
  const { User_Info } = useServer();

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="welcome-box">
             
              <div className="welcome-det">
                <h5>
                  Welcome,
                  <span style={{ textTransform: "capitalize" }}>
                    {User_Info.User_Name}
                    <span />
                  </span>
                </h5>
                <p>{moment(new Date()).format("dddd, D MMM , YYYY")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashBoard;
