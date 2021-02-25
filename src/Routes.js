import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";//to make the routing easy we have installed this package
import Signup from "./user/Signup";//Importing Signup component
import Signin from "./user/Signin";//Importing Signin component
import Home from "./core/Home";//Importing Home component
import PrivateRoute from "./auth/PrivateRoute";//Importing private route component
import Dashboard from "./user/UserDashboard"; //importing the dashbord
import AdminDashboard from "./user/AdminDashboard";//Admin dashboard component imported
import AdminRoute from "./auth/AdminRoute";//Admin route from auth
import AddCategory from "./admin/AddCategory"; //to add category by the admin


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <AdminRoute
                    path="/admin/dashboard"
                    exact
                    component={AdminDashboard}
                />
                <AdminRoute
                    path="/create/category"
                    exact
                    component={AddCategory}
                />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
