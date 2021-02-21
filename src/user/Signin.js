import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin } from "../auth"; //important method which interacts with backend
import { ProgressBar} from 'react-bootstrap';
import {authenticate} from '../auth/index' //important middleware which helps to set the data to localstorage


const Signin = () => {

    const [values, setValues] = useState({
        email: "baba@gmail.com",
        password: "baba123",
        error: "",
        loading: false,
        redirectToReferrer: false,
        percentage:73
    });

    const { email, password, loading, error, redirectToReferrer,percentage } = values; //destructing the values for separate use

    const handleChange = name => event => { //again using high order function
        setValues({ ...values, error: false, [name]: event.target.value }); //according to change in the input feild it will reflect
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {  //we need only two parameter to passs to the backend
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    const signUpForm = () => (
        <div>
        <form>
            <div className="form-group">
                <label className="text-light">Email</label>
                <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}  //this will make the input feild blank after once submited the value
                />
            </div>

            <div className="form-group">
                <label className="text-light">Password</label>
                <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <button onClick={clickSubmit} className="btn btn-secondary">
                Submit
            </button>
        </form>
        <div className="text-sm-right text-secondary mt-5">createdBy@Indranil2020-21</div>
        </div>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="progressBar p-2">
                    <ProgressBar now={percentage} animated/>
             </div>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            return <Redirect to="/" />;
        }
    };

    return (
        <Layout
            title="Signin"
            description="Namastey , Please Signin to GoodReads"
            className="container col-md-8 offset-md-2"
        >
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </Layout>
    );
};

export default Signin;
