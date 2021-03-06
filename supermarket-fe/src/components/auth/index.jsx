import { API } from "../../config";

export const signup = (user) => {
  // console.log(name, email, password);
  return fetch(`${API}/signup`, {
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

export const signin = (user) => {
  // console.log(name, email, password);
  return fetch(`${API}/signin`, {
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

export const authenticate = (data, next) => {
  // check if we have the window object
  if (typeof window !== "undefined") {
    // setItem is the method use to store items in the localStorage
    // 'jwt': key
    // data(saved as JSON): item you want to save with the key
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => {
        console.log("signout", response);
      })
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    // When we first saved its in JSON format, so now we are retrieving from the local storage,
    // use the parse method to return the JSON format
    return JSON.parse(localStorage.getItem("jwt"));
    // localStorage.getItem("jwt") --> The jwt has the token as well as user information
  } else {
    return false;
  }
};
