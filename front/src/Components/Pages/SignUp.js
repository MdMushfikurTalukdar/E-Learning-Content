import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { public_api } from "../hooks/baseApi";

const SignUp = () => {
  const navigate = useNavigate();
  const [Img, setImg] = useState();

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImg(e.target.files[0]);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    
    const formData = new FormData();
    formData.append("Img", Img);
    formData.append("Student_Id", data.Student_Id);
    formData.append("Student_FirstName", data.Student_FirstName);
    formData.append("Student_LastName", data.Student_LastName);
    formData.append("Student_Email", data.Student_Email);
    formData.append("Password", data.Password);
    formData.append("Student_Phone", data.Student_Phone);
    formData.append("Address", data.Address);
    try {
      const res = await public_api()
        .post("Student/signup", formData)
        .catch(function (error) {
          toast.error(error.response.data.message);

        });
      // console.log("info", res.data.data);

      if (res.data.status === "Success") {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      // console.log(err.message);
    }
  };
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    preview: {
      marginTop: 10,
      display: "flex",
      flexDirection: "column",
    },
    image: { maxWidth: "100%", maxHeight: 100 },
    delete: {
      cursor: "pointer",
      padding: 15,
      background: "red",
      color: "white",
      border: "none",
    },
  };

  return (
    <>
      <div className="account-page">
        <div className="main-wrapper">
          <div className="account-content">
            <div className="container">
              <div className="account-logo">
                <a href="admin-dashboard.html">
                  <img src="" alt="PM" />
                </a>
              </div>
              <div className="account-box">
                <div className="account-wrapper">
                  <h3 className="account-title">Student SignUp</h3>
                 
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-sm-12 m-auto">
                      <div className="form-group">
                        <div style={styles.container}>
                          <label className="col-form-label">
                            Profile Picture
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            required
                            accept="image/*"
                            type="file"
                            onChange={imageChange}
                          />

                          {Img && (
                            <div style={styles.preview}>
                              <img
                                src={URL.createObjectURL(Img)}
                                style={styles.image}
                                alt="Thumb"
                              />
                             
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>User Id</label>
                          <input
                            type="text"
                            className="form-control"
                            name="Student_Id"
                            {...register("Student_Id")}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="Student_FirstName"
                            {...register("Student_FirstName")}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="Student_LastName"
                            {...register("Student_LastName")}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Email Address</label>
                          <input
                            className="form-control"
                            type="email"
                            name="Student_Email"
                            {...register("Student_Email")}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Phone</label>
                          <input
                            className="form-control"
                            type="text"
                            name="Student_Phone"
                            {...register("Student_Phone")}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Address</label>
                          <input
                            type="text"
                            className="form-control"
                            name="Address"
                            {...register("Address")}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="row">
                            <div className="col">
                              <label>Password</label>
                            </div>
                          </div>
                          <div className="position-relative">
                            <input
                              className="form-control"
                              type="password"
                              name="Password"
                              {...register("Password")}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group text-center">
                      <button
                        className="btn btn-primary account-btn"
                        type="submit">
                        SignUp
                      </button>
                    </div>
                    <div className="account-footer">
                      <p>
                        Already have an account? Please{" "}
                        <a href="/login">Login</a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
