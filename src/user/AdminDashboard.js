import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();

    const adminLinks = () => {
        return (
            <div className="card text-white bg-warning mb-3 p-2 border border-primary">
                <h4 className="card-header">Admin Privillages</h4>
                <ul className="list-group">
                    <li className="list-group-item list-group-item-action">
                        <Link className="nav-link" to="/create/category">
                            Create Category
                        </Link>
                    </li>
                    <li className="list-group-item list-group-item-action">
                        <Link className="nav-link" to="/create/product">
                            Create Product
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const adminInfo = () => {
        return (
            <div className="card mb-5 p-0 border border-secondary">
                <h4 className="card-header text-light">User Information</h4>
                <ul className="list-group" style={{textDecoration:"none"}}>
                    <li className="list-group-item text-light ">{name}</li>
                    <li className="list-group-item text-light ">{email}</li>
                    <li className="list-group-item text-warning">
                        {role === 1 ? "Admin" : "Registered User"}
                    </li>
                </ul>
            </div>

        );
    };

   


    return (
        <Layout
            title="Admin Dashboard"
            description={`Have a good Day, ${name}`}
            className="container-fluid text-light"
        >
            <div className="row">
                <div className="col-md-3 offset-md-1">{adminLinks()}</div>
                <div className="col-md-7">
                    {adminInfo()}
                </div>
            </div>
            
            
        </Layout>
    );
};

export default AdminDashboard;