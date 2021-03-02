import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createProduct,getCategories } from "./apiAdmin";
import { ProgressBar} from 'react-bootstrap';

const AddProduct = () => {
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        categories: [], //pull all the categories from the backend and popluate the drop down menu
        category: "", //single category
        shipping: "",
        quantity: "",
        photo: "",
        loading: false,
        error: "",
        createdProduct: "",
        redirectToProfile: false, //profile page
        formData: ""
    });

    // destructure all the values form the state so it is easy to use in the form
    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    // load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => event => {
        const value =
            name === "photo" ? event.target.files[0] : event.target.value; //to grab files we use event.target.files[0] and for others event.target.value // checking by using ternary operator
        formData.set(name, value); //form data api available in browsers
        setValues({ ...values, [name]: value }); //after grabing the values setting the state
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });

        createProduct(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    photo: "",
                    price: "",
                    quantity: "",
                    loading: false,
                    createdProduct: data.name
                });
            }
        });
    };

    const goBack = () => (
        <div className="mt-5 ">
            <Link to="/admin/dashboard" className="text-warning" style={{"textDecoration":"none"}}>
                Back to Dashboard
            </Link>
        </div>
    );

    const newPostForm = () => (
        <form className="mb-5" onSubmit={clickSubmit}>
            <div className="float-right">{goBack()}</div>
            
            <h4>Post Photo</h4>
            <div className="form-group p-0">
            
                <label className="btn btn-secondary">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo" //to update the backend
                        accept="image/*"
                        className="bg-secondary p-0"
                    />
                     
                </label>
               
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea
                    onChange={handleChange("description")}
                    className="form-control"
                    value={description}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    value={price}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select
                    onChange={handleChange("category")}
                    className="form-control p-1"
                >
                   <option>Please select</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select
                    onChange={handleChange("shipping")}
                    className="form-control p-2"
                >
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input
                    onChange={handleChange("quantity")}
                    type="number"
                    className="form-control"
                    value={quantity}
                />
            </div>

            <button className="btn btn-secondary">Create Product</button>
        </form>
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
            className="alert alert-info"
            style={{ display: createdProduct ? "" : "none" }}
        >
            {`${createdProduct}`} is created
        </div>
    );

    const percentage =73;

    const showLoading = () =>
    loading && (
        
        <div className="progressBar p-2">
                <ProgressBar now={percentage} animated/>
         </div>
    );

    return (
        <Layout
            title="Add a new product"
            description={`G'day ${user.name}, ready to add a new product?`}
        >
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="m-1">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    
                    {newPostForm()}
                    </div>
                    
                </div>
               
            </div>
           
        </Layout>
    );
};

export default AddProduct;
