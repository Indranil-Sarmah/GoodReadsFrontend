import React from 'react'
import {Link,withRouter} from 'react-router-dom'

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
    <ul className="nav nav-tabs bg-primary ">
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
    </ul>
    </div>
)
}

export default withRouter(Menu);