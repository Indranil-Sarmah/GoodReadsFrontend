import React, { useState } from "react"; //hook useState from react
import Layout from "../core/Layout";
import { API } from "../config";

const Signup = () => {
    const [values, setValues] = useState({ // create useState as an object which contains differnt values
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const handleChange = name => event => { //higher oder function : function returning another function , here name is the name of the state(name,email,password) and event is what event it is currently perfoming
        setValues({ ...values, error: false, [name]: event.target.value }); //to set the state we will use the setValues  method(... is rest operator , to grab the rest of the value)
    };

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-light">Name</label>
                <input
                    onChange={handleChange("name")}//this onChange methods helps to fetch the text from input label as user enters anything overall to grab the change event
                    type="text"
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label className="text-light">Email</label>
                <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label className="text-light">Password</label>
                <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-control"
                />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    );

    return (
        <Layout
            title="Signup"
            description="Signup to GoodReads : An E-commerce App"
            className="container col-md-8 offset-md-2" //to make the form center alling using bootsrap class
        >
            {signUpForm()}
            {JSON.stringify(values)}
        </Layout>
    );
};

export default Signup;

//grab the values from the state and send it to backend
