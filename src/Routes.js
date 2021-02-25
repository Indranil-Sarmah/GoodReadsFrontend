import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";//to make the routing easy we have installed this package
import Signup from "./user/Signup";//Importing Signup component
import Signin from "./user/Signin";//Importing Signin component
import Home from "./core/Home";//Importing Home component
import PrivateRoute from "./auth/PrivateRoute";//Importing private route component
import Dashboard from "./user/UserDashboard"; //importing the dashbord


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
