import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate } from "../auth/index";

const Signin = () => {
  const [values, setValues] = useState({
    email: "zul@gmail.com",
    password: "1234",
    error: "",
    loading: false,
    // loading by default is false
    // When sign in is in progress, we can show the loading text
    redirectToReferrer: false,
    // When user successfully signs in, this will be set to true
  });

  const { email, password, loading, error, redirectToReferrer } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
        console.log(data.error);
      } else {
        // if successful, the input fields will be cleared
        // ... --> Grab all the values in values field
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
      <div className="form-group mt-2">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control mt-2"
          value={email}
        />
      </div>

      <div className="form-group mt-2">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control mt-2"
          value={password}
        />
      </div>

      <button onClick={clickSubmit} className="btn btn-primary mt-3">
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      // if error, the message will be visible, else none
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {};
  if (redirectToReferrer) {
    return <Redirect to="/" />;
  }
  return (
    <Layout
      title="Signin"
      description="Signin to SiongSiong Supermarket App"
      className="container col-md-8 offset-md-2"
    >
      {showLoading()}
      {showError()}
      {signUpForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
