import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { public_api } from "../hooks/baseApi";

const SignUpTeacher = () => {
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
    formData.append("Teacher_Id", data.Teacher_Id);
    formData.append("Teacher_FirstName", data.Teacher_FirstName);
    formData.append("Teacher_LastName", data.Teacher_LastName);
    formData.append("Teacher_Email", data.Teacher_Email);
    formData.append("Password", data.Password);
    formData.append("Teacher_Phone", data.Teacher_Phone);
    formData.append("Address", data.Address);
    // console.log(data);
    try {
      const res = await public_api()
        .post("Teacher/signup", formData)
        .catch(function (error) {
          toast.error(error.response.data.message);
          // toast.error(error.response.data.error);

          // console.log('test---:-',error.response.data.message);
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
                  <h3 className="account-title">Teacher SignUp</h3>
                  
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
                            name="Teacher_Id"
                            {...register("Teacher_Id")}
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
                            name="Teacher_FirstName"
                            {...register("Teacher_FirstName")}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="Teacher_LastName"
                            {...register("Teacher_LastName")}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Email Address</label>
                          <input
                            className="form-control"
                            type="email"
                            name="Teacher_Email"
                            {...register("Teacher_Email")}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Phone</label>
                          <input
                            className="form-control"
                            type="text"
                            name="Teacher_Phone"
                            {...register("Teacher_Phone")}
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
export default SignUpTeacher;
