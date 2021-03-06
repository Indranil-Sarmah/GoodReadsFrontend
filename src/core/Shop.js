import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories } from "./apiCore";
import Checkbox from "./Checkbox";


const Shop = () => {

    const [categories, setCategories] = useState([]); //state to hold the catefgories from backend
    const [error, setError] = useState(false);

    const init = () => {   //this will run automatically when components mount and load the categories using getCategories
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    useEffect(() => {
        init();
    }, []); //when components mount

    const handleFilters = (filters, filterBy) => { //filters and filtersBy
        console.log("SHOP", filters, filterBy);
    };

    return (
        <Layout
            title="Shop Page"
            description="Search and find books of your choice"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-md-4">
                    <h4 className="text-light">Filter by categories</h4>
                    <ul>
                        <Checkbox categories={categories} handleFilters={filters =>
                                handleFilters(filters, "category")} />
                    </ul>
                </div>

                <div className="col-8">right</div>
            </div>
        </Layout>
    );
};

export default Shop;