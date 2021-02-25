import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const AddCategory = () => {
    const [name, setName] = useState("");//to name the category
    const [error, setError] = useState(false);//if there is any kind of error then to handle that this use state method is used
    const [success, setSuccess] = useState(false);//simmilar as error

    // destructure user and token from localstorage
    const { user, token } = isAuthenticated();

    const handleChange = e => {  //method to handle the event e
        setError("");
        setName(e.target.value); //whatever user is typing grabing that
    };

    const clickSubmit = e => { //method to submit the form
        e.preventDefault();  //prevent page reload
        setError("");
        setSuccess(false);
        // make request to api to create category
    };

    const newCategoryFom = () => (  //add a form to create a new category > clicksubmit is defined above
        <form onSubmit={clickSubmit}> 
            <div className="form-group">
                <label className="text-light">Category Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange} //to handle the change event in the input form
                    value={name}
                    autoFocus
                />
            </div>
            <button className="btn btn-warning">Create Category</button>
        </form>
    );

    return (
        <Layout
            title="Add a new category"
            description={`${user.name}, ready to add a new category?`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">{newCategoryFom()}</div>
            </div>
        </Layout>
    );
};

export default AddCategory;
