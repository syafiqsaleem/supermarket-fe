import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./components/user/Signup";
import Signin from "./components/user/Signin";
import Home from "./components/core/Home";
import Dashboard from "./components/user/UserDashboard";
import AdminDashboard from "./components/user/AdminDashboard";
import Shop from "./components/core/Shop";
import Product from "./components/core/Product";
import Cart from "./components/core/Cart";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Orders from "../src/components/admin/OrderAdmin";
import Profile from "./components/user/Profile";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/product/:productId" exact component={Product} />
        <AdminRoute path="/admin/orders" exact component={Orders} />
        <PrivateRoute path="/profile/:userId" exact component={Profile} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
