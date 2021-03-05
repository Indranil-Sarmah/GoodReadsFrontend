import React from 'react'
import {Link,withRouter} from 'react-router-dom'
import { signout,isAuthenticated } from "../auth";

const isActive = (history, path) => { //show the current navigation tab 
    if (history.location.pathname === path) { //browser functionality
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};

//We use link from react-router-dom to avoid page refresh by clicking an achor tag
const Menu = ({ history })=>{
    return(
    <div>
    {/* <ul className="nav nav-tabs navbar-expand-lg navbar-dark bg-dark pt-2 pb-2">
        <li className="nav-item nav-link font-weight-bold">
            GoodReads 
        </li>
        <li className="nav-item">
            <Link
                className="nav-link"
                style={isActive(history, "/")}
                to="/"
            >
                Home
            </Link>
        </li>

        <li className="nav-item">
            <Link
                className="nav-link"
                style={isActive(history, "/signin")}
                to="/signin"
            >
                Signin
            </Link>
        </li>

        <li className="nav-item">
            <Link
                className="nav-link"
                style={isActive(history, "/signup")}
                to="/signup"
            >
                Signup
            </Link>
        </li>
    </ul> */}
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand font-weight-bold" href="#">GoodReads</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
              
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/")}
                            to="/"
                        >
                            Home
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/shop")}
                            to="/shop"
                        >
                            Shop
                        </Link>
                    </li>


                    {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/user/dashboard")}
                        to="/user/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/admin/dashboard")}
                        to="/admin/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
            )}

            {!isAuthenticated() && ( //conditional link display
                <>

                <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signin")}
                            to="/signin"
                        >
                            Signin
                        </Link>
                    </li>

                <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signup")}
                            to="/signup"
                        >
                            Signup
                        </Link>
                </li>

                </>
            )}

            {isAuthenticated() && ( //conditional link display
            <li className="nav-item">
                <span   //used span tag because i don't want to rediceret it to any other page
                    className="nav-link text-light"
                    style={{ cursor: "pointer", color: "#de870d" }}
                    onClick={() =>
                        signout(() => {
                            history.push("/"); //so, in this method we can redirect the user to the homepage
                        }) //takes a method as an argument ^
                    }
                >
                    Signout
                </span>
                </li>
            )}
                </ul>
            </div>
</nav>

    </div>
)
}

export default withRouter(Menu);