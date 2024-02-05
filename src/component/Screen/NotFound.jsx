import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ maxWidth: "100vw", maxHeight: "100%",backgroundColor:"white" }} className="p-2">
      <Link className="fw-bold link mb-3 d-block" to="..">
        Go to Back
      </Link>
      <center>
        <img
          src="/image/dog.png"
          alt="not found"
          style={{ maxWidth: "100%", minHeight: "22rem", maxHeight: "100vh" }}
        />
      </center>
    </div>
  );
}
