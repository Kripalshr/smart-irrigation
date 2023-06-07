import React, { useState } from "react";
import "./Form.css";
import logo from "../../assets/logo.png";
import "bootstrap/dist/css/bootstrap.css";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../network";

const Form = () => {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");
  const [isLoginForm, setisLoginForm] = useState(false);
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
    loggedInUser: "",
  });

  const { fullName, email, password } = values;

  const handleSubmit = async (event) => {
    event?.preventDefault();
    const payload = {
      email,
      password,
    };

    const signupPayload = {
      fullName,
      email,
      password,
    };

    if (isLoginForm) {
      try {
        const { data } = await axiosInstance.post("/auth/login", payload);
        window.localStorage.setItem("accessToken", JSON.stringify(data?.token));
        navigate("/dashboard");
      } catch (err) {
        console.log("Errror", err?.response?.data);
        setErrorText(err?.response?.data?.message);
      }
    } else {
      try {
        const { data } = await axiosInstance.post(
          "/auth/signup",
          signupPayload
        );
        window.localStorage.setItem("accessToken", JSON.stringify(data?.token));
        navigate("/dashboard");
      } catch (err) {
        console.log("Errror", err?.response?.data);
        setErrorText(err?.response?.data?.message);
      }
    }
  };

  console.log("Err----->", errorText);

  return (
    <div className="container">
      <div className="forms-container">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <h1>Rain Rain</h1>
        </div>

        {errorText && <p> {errorText} </p>}

        <form onSubmit={handleSubmit}>
          {!isLoginForm && (
            <div className="form-group groups">
              <label>Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={fullName}
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    fullName: event?.target?.value,
                  }))
                }
              />
            </div>
          )}
          <div className="form-group groups">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  email: event?.target?.value,
                }))
              }
            />
          </div>
          <div className="form-group groups">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  password: event?.target?.value,
                }))
              }
            />
          </div>
          <button type="submit" className="btn btn-success btn-lg btn-block">
            {isLoginForm ? "Login" : "Sign up"}
          </button>
          <p>
            {isLoginForm
              ? "Don't have an account?"
              : "Already have an account? "}
            <span onClick={() => setisLoginForm(!isLoginForm)}>
              {isLoginForm ? "Sign up" : "Login"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Form;
