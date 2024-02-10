import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHelper from "../Commn/ApiHelper";

export default function RegisterScreen() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  console.log(userInfo);

  const inputchang = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const Registerhandler = async (ev) => {
    ev.preventDefault();
    try {
      const result = await apiHelper.registerUser(userInfo);
      navigate("/");

      console.log(result)
      // apiHelper.setToken(result.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid pt-2 pb-3">
      <h3
        className="fw-bold text-center"
        style={{ textDecoration: "underline", textDecorationColor: "#ffc107" }}
      >
        amazon
      </h3>
      <hr className="mb-3" />
      <div className="d-flex justify-content-center align-items-center">
        <div className="col-12 col-md-6" style={{maxWidth:"500px"}}>
          <div className="shadow rounded p-3">
            <h5 className="fs-2 fw-normal mb-4">Create account</h5>
            <div className="row">
              <form onSubmit={Registerhandler}>
                {/* Firstname  */}
                <div className="col-12 mb-2">
                  <label htmlFor="firstName">Firstname</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    onChange={inputchang}
                    className="input rounded"
                  />
                </div>

                {/* Lastname  */}
                <div className="col-12 mb-2">
                  <label htmlFor="lastName">Lastname</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    onChange={inputchang}
                    className="input rounded"
                  />
                </div>

                {/* Email  */}
                <div className="col-12 mb-2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={inputchang}
                    className="input rounded"
                  />
                </div>

                {/* Password  */}
                <div className="col-12 mb-2">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={inputchang}
                    className="input rounded"
                  />
                </div>

                {/* Confirm-Password  */}
                <div className="col-12 mb-3">
                  <label htmlFor="confirm_password">Confirm-Password</label>
                  <input
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    onChange={inputchang}
                    className="input rounded"
                  />
                </div>
                <div className="col-12 mb-3">
                  <button
                    type="submit"
                    className="bg-gradient w-100 border border-secondary btn btn-warning"
                  >
                    Sign Up
                  </button>
                </div>
                <div className="col-12 mb-3">
                  <div className="d-flex gap-1 justify-content-center align-items-center">
                    <hr className="d-block" style={{ width: "2rem" }} />
                    <i className="fw-normal" style={{ fontSize: "0.9rem" }}>
                      Allready have an account?
                    </i>
                    <hr className="d-block" style={{ width: "2rem" }} />
                  </div>
                </div>
                <div className="col-12 mb-2">
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="bg-gradient w-100 border border-secondary btn btn-light"
                  >
                    Sing In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
