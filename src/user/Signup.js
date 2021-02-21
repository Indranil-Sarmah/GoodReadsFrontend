import React, { useState } from "react"; //hook useState from react
import { Link } from "react-router-dom"; //to link the signin component
import Layout from "../core/Layout";
import {signup} from '../auth/index'


const Signup = () => {
    const [values, setValues] = useState({  // create useState as an object which contains differnt values
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const { name, email, password, success, error } = values; //destructuring it

    const handleChange = name => event => {  //higher oder function : function returning another function , here name is the name of the stat(name,email,password) and event is what event it is currently perfoming
        setValues({ ...values, error: false, [name]: event.target.value }); //to set the state we will use the setValues  method(... is rest                                                                  operator , to grab the rest of the value)
    };

    

    // //************************************************* */
    // //************ signup method is coming from auth ************************** */
    // //this signup method will insert the data into backend database

    // const signup = user => {
    //     return fetch(`${API}/signup`, {     // fetch the signup route of Backend API(which we haver already defined) or use axios as well , we need to return the fetch otherwise we will get .then undefined 
    //         method: "POST",     //what type request defined in the API
    //         headers: {          //default set headers from the Accept type and Content-type
    //             Accept: "application/json",
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(user)      //convert the javascipt object in string fomat 
    //     })
    //         .then(response => {
    //             return response.json();  //after sending the data server will response something : in response object (correct resp or it might be error)
    //         })
    //         .catch(err => {
    //             console.log(err);  //response an error if worng data submitted
    //         });
    // };

    // //*****************************************************************/


    const clickSubmit = event => {      //this method will fired when submit button is pressed in the form
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {    //call the ultimate metod which will talk to our database
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true
                });
            }
        });
    };

    const signUpForm = () => (
        <div>
        <form>
            <div className="form-group">
                <label className="text-light">Name</label>
                <input
                    onChange={handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>

            <div className="form-group">
                <label className="text-light">Email</label>
                <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
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
        <div className="text-sm-right text-secondary">createdBy@Indranil2020-21</div>
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

    const showSuccess = () => (
        <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
        >
            New account is created. Please <Link to="/signin" className="font-weight-bold" style={{textDecoration:'none'}}>Signin</Link>
        </div>
    );

    return (
        <Layout
            title="Signup" 
            description="Signup to GoodReads : An E-commerce App"
            className="container col-md-8 offset-md-2"  //to make the form center alling
        >
            {showSuccess()}
            {showError()} 
            {signUpForm()}
        </Layout>
    );
};

export default Signup;

//1.grab the values from the state and send it to backend
//2.handel the sucess and error