import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import apiHelper from "../Commn/ApiHelper";

export default function LoginScreen() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({});

  const inputchang = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const Loginhandler = async (ev) => {
    ev.preventDefault();
    try {
    const result =   await apiHelper.loginUser(userInfo);
      console.log(result.data.token)
      
      navigate("/");
    } catch (error) {
      console.error(error);
      if (error && error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
      }

    }
  };

  return (
    <div className="container-fluid pt-2 pb-3">
       <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <h3
        className="fw-bold text-center"
        style={{ textDecoration: "underline", textDecorationColor: "#ffc107" }}
      >
        amazon
      </h3>
      <hr className="mb-3" />
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="col-12 col-md-6 " style={{maxWidth:"500px"}}>
          <div className="shadow rounded p-3">
            <h5 className="fs-2 fw-normal mb-4">Sign In</h5>
            <div className="row">
              <form onSubmit={Loginhandler}>
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
                <div className="col-12 mb-3">
                  <button
                    type="submit"
                    className="bg-gradient w-100 border border-secondary btn btn-warning"
                  >
                    Sign In
                  </button>
                  <Link className="link" to={"##"}>
                    {" "}
                    Forget Password
                  </Link>
                </div>
                <div className="col-12 mb-3">
                  <div className="d-flex gap-1 justify-content-center align-items-center">
                    <hr className="d-block" style={{ width: "2rem" }} />
                    <i className="fw-normal" style={{ fontSize: "0.9rem" }}>
                      No have an Account
                    </i>
                    <hr className="d-block" style={{ width: "2rem" }} />
                  </div>
                </div>
                <div className="col-12 mb-2">
                  <button
                    onClick={() => {
                      navigate("/register");
                    }}
                    className="bg-gradient w-100 border border-secondary btn btn-light"
                  >
                    Create an Account
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
