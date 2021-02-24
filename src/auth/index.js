import { API } from "../config";
   
//************************************************* */
//************ signup method is exported from Signup.js ************************** */
//this signup method will insert the data into backend database

export const signup = user => {
        return fetch(`${API}/signup`, {     // fetch the signup route of Backend API(which we haver already defined) or use axios as well , we need to return the fetch otherwise we will get .then undefined 
            method: "POST",     //what type request defined in the API
            headers: {          //default set headers from the Accept type and Content-type
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)      //convert the javascipt object in string fomat 
        })
            .then(response => {
                return response.json();  //after sending the data server will response something : in response object (correct resp or it might be error)
            })
            .catch(err => {
                console.log(err);  //response an error if worng data submitted
            });
    };

//*****************************************************************/

//************ signup method exported to Signin.js************************** */
//this signup method will insert the data into backend database

export const signin = user => {
        return fetch(`${API}/signin`, {     // fetch the signup route of Backend API(which we haver already defined) or use axios as well , we need to return the fetch otherwise we will get .then undefined ERROR
            method: "POST",     //what type request defined in the API
            headers: {          //default set headers from the Accept type and Content-type
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)      //convert the javascipt object in string fomat 
        })
            .then(response => {
                return response.json();  //after sending the data server will response something : in response object (correct resp or it might be error)
            })
            .catch(err => {
                console.log(err);  //response an error if worng data submitted
            });
 };

//*****************************************************************/

//**** authenticate : this method will store the currently signined in user in the local sotrage****** */

export const authenticate = (data, next) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("jwt", JSON.stringify(data)); //data is the user information we are getting from the backend,localStorage.setItem() stores the data in browser's local storage
            next();
        }
};

/*****************SignOut method**************************************/
export const signout = next => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("jwt"); //clear the local storage using remove item
            next(); //redicrect to the homepage 
            return fetch(`${API}/signout`, {  //hit the backend api to remove the token/cookie //fetch take two args (routes and method)
                method: "GET"
            })
                .then(response => { //server will response someting : succes OR error
                    console.log("signout", response); //success
                })
                .catch(err => console.log(err));//error
        }
};
/******************************************************/

/****************************isAuthendticated is method signIn users******************** */

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("jwt")) { //check if user is signedin
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;  //user is not siged in
    }
};


/***************** */