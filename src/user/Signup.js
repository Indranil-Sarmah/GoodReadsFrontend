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

    const { name, email, password } = values; //destructuring it

    const handleChange = name => event => { //higher oder function : function returning another function , here name is the name of the state(name,email,password) and event is what event it is currently perfoming
        setValues({ ...values, error: false, [name]: event.target.value }); //to set the state we will use the setValues  method(... is rest operator , to grab the rest of the value)
    };

    //************************************************* */
    //this signup method will insert the data into backend database
    const signup = user => {
        fetch(`${API}/signup`, { //fetch the signup route of Backend API(which we haver already defined) or use axios as well
            method: "POST", //what type request defined in the API
            headers: {  //default set headers from the Accept type and Content-type
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)//convert the javascipt object in string fomat 
        })
            .then(response => {  //after sending the data server will response something : in response object (correct resp or it might be error)
                return response.json(); // for correct response if data submitted successfully 
            })
            .catch(err => {
                console.log(err); //response an error if worng data submitted
            });
    };
    //*****************************************************************/

    const clickSubmit = event => {  //this method will fired when submit button is pressed in the form
        event.preventDefault();
        signup({ name, email, password }); //call the ultimate metod which will talk to our database using the user object as a parameter
    };

    const signUpForm = () => (
        <div>
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
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
        <div className="text-sm-right text-primary">createdBy@Indranil2020-21</div>
        </div>
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
