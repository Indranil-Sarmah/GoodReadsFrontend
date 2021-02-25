import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();

    const userLinks = () => {
        return (
            <div className="card text-white bg-secondary mb-3 p-2 border border-secondary">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item list-group-item-action">
                        <Link className="nav-link" to="/cart">
                            My Cart
                        </Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <Link className="nav-link" to="/profile/update">
                            Update Profile
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const userInfo = () => {
        return (
            <div className="card mb-5 p-0 border border-secondary">
                <h4 className="card-header text-light">User Information</h4>
                <ul className="list-group" style={{textDecoration:"none"}}>
                    <li className="list-group-item text-light ">{name}</li>
                    <li className="list-group-item text-light ">{email}</li>
                    <li className="list-group-item">
                        {role === 1 ? "Admin" : "Registered User"}
                    </li>
                </ul>
            </div>

        );
    };

    const purchaseHistory = () => {
        return (
            <div className="card mb-5 border border-secondary">
                 <h4 className="card-header text-light">Purchase history</h4>
                    <ul className="list-group">
                         <li className="list-group-item ">history</li>
                    </ul>
        </div>
        );
    };


    return (
        <Layout
            title="Dashboard"
            description={`Have a good Day, ${name}`}
            className="container-fluid text-light"
            
        >
            <div className="row">
                <div className="col-md-3 offset-md-1">{userLinks()}</div>
                <div className="col-md-7">
                    {userInfo()}
                    {purchaseHistory()}
                </div>
            </div>
            
            
        </Layout>
    );
};

export default Dashboard;