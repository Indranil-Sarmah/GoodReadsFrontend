import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

//component for private route
const AdminRoute = ({ component: Component, ...rest }) => ( //bring the react Component and rest of the props
    <Route
        {...rest} //grab the props
        render={props =>
            isAuthenticated() && isAuthenticated().user.role===1 ? ( //if user is authenticated and user.role is admin
                <Component {...props} /> //the component coming from Routes as props //AdminDashboard component
            ) : (
                <Redirect  //else redirect to somewhere else
                    to={{
                        pathname: "/signin",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default AdminRoute;
