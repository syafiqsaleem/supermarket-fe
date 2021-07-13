import React, { useState } from "react";
import Layout from "../core/Layout";
// import { API } from ".../config";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const signUpForm = () => (
    <form>
      <div className="form-gorup mt-2">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control mt-2"
        />
      </div>

      <div className="form-gorup mt-2">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control mt-2"
        />
      </div>

      <div className="form-gorup mt-2">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control mt-2"
        />
      </div>

      <button className="btn btn-primary mt-3">Submit</button>
    </form>
  );

  return (
    <Layout
      title="Signup"
      description="Signup to SiongSiong Supermarket App"
      className="container col-md-8 offset-md-2"
    >
      {signUpForm()}
      {JSON.stringify(values)}
    </Layout>
  );
};

export default Signup;
