import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./components/user/Signup";
import Signin from "./components/user/Signin";
import Home from "./components/core/Home";
import Cart from "./components/core/Cart";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/cart" exact component={Cart} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
