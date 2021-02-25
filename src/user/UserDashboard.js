import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";

const Dashboard = () => {
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();

    return (
        <Layout
            title="Dashboard"
            description="User Dashboard"
            className="container"
        >
            <div className="card mb-5 p-0 border border-secondary">
                <h4 className="card-header text-light">User Information</h4>
                <ul className="list-group" style={{textDecoration:"none"}}>
                    <li className="list-group-item text-light">{name}</li>
                    <li className="list-group-item text-light">{email}</li>
                    <li className="list-group-item">
                        {role === 1 ? "Admin" : "Registered User"}
                    </li>
                </ul>
            </div>

            <div className="card mb-5 border border-secondary">
                <h4 className="card-header text-light">Purchase history</h4>
                <ul className="list-group">
                    <li className="list-group-item">history</li>
                </ul>
            </div>
        </Layout>
    );
};

export default Dashboard;