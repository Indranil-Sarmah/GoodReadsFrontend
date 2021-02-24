import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

//component for private route
const PrivateRoute = ({ component: Component, ...rest }) => ( //bring the react Component and rest of the props
    <Route
        {...rest} //grab the props
        render={props =>
            isAuthenticated() ? ( //if user is authenticated the return this
                <Component {...props} />
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

export default PrivateRoute;
