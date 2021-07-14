import React, { useState } from "react";
import Layout from "../core/Layout";
import { API } from "../../config";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const signup = (user) => {
    // console.log(name, email, password);
    fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    signup({ name, email, password });
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

      <button onClick={clickSubmit} className="btn btn-primary mt-3">
        Submit
      </button>
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
