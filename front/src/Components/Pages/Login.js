import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { public_api } from "../hooks/baseApi";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    try {
      const res = await public_api()
        .post("user/login", {
          User_Email: data.User_Email,
          pass_word: data.pass_word,
        })
        .catch(function (error) {
          toast.error(error.response.data.message);
          toast.error(error.response.data.error);
        });

      if (res.data.status === "Success") {
        console.log("first", res.data.data.user.User_Email);

        if (res.data.data.user.role == "user") {
          localStorage.setItem("uid", res.data.data.user.User_ID);
          localStorage.setItem("username", res.data.data.user.User_Name);
          localStorage.setItem("email", res.data.data.user.User_Email);
          Cookies.set("token", res.data.data.token);
          localStorage.setItem("username", res.data.data.user.User_Name);
          localStorage.setItem("firstload1", "true");
          
          toast.success(res.data.message);
          navigate("/");
        } else if (res.data.data.user.role == "admin") {
          localStorage.setItem("uid", res.data.data.user.User_ID);
          localStorage.setItem("username", res.data.data.user.User_Name);
          localStorage.setItem("email", res.data.data.user.User_Email);
          Cookies.set("token", res.data.data.token);
          localStorage.setItem("username", res.data.data.user.User_Name);
          localStorage.setItem("firstload1", "true");
          
          toast.success(res.data.message);
          navigate("/");
        }
      }
    } catch (err) {
      // console.log(err.message);
    }
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
                  <h3 className="account-title">Login</h3>
                  <p className="account-subtitle">Access to our dashboard</p>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        className="form-control"
                        type="email"
                        name="User_Email"
                        {...register("User_Email", {
                          required: "this field is required.",
                          pattern: {
                            value:
                              /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                            message: "please enter a valid email address.",
                          },
                        })}
                      />
                      {errors.User_Email && (
                        <div className="text-danger">
                          {errors.User_Email.message}
                        </div>
                      )}
                    </div>
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
                          name="pass_word"
                          {...register("pass_word", {
                            required: "this field is required.",
                            pattern: {
                              value:
                                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{4,}$/,
                              message: "please enter a valid password.",
                            },
                          })}
                        />
                        {errors.pass_word && (
                          <div className="text-danger">
                            {errors.pass_word.message}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="form-group text-center">
                      <button
                        className="btn btn-primary account-btn"
                        type="submit">
                        Login
                      </button>
                    </div>
                    <div className="account-footer">
                      <p>
                        Don't have an account yet?{" "}<br></br>
                        <a href="/signup">Register For Student</a>
                        <br></br>
                        <a href="/signupTeacher">Register for Teacher</a>
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
export default Login;
