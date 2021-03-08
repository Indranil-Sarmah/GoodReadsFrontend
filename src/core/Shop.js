import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories } from "./apiCore";
import Checkbox from "./Checkbox";
import { prices } from "./fixedPrices";
import RadioBox from "./RadioBox";


const Shop = () => {

    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });

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
        //console.log("SHOP", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;
        setMyFilters(newFilters);
    };

    return (
        <Layout
            title="Shop Page"
            description="Search and find books of your choice"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-md-4">
                    <h5 className="text-light">Filter by categories</h5>
                    <ul>
                        <Checkbox categories={categories} handleFilters={filters =>
                                handleFilters(filters, "category")} />
                    </ul>
                    
                    <h5 className="text-light">Filter by price range</h5>
                    <div >
                        <RadioBox
                            prices={prices}
                            handleFilters={filters =>
                                handleFilters(filters, "price")
                            }
                        />
                    </div>
                </div>

                <div className="col-8">{JSON.stringify(myFilters)}</div>
            </div>
        </Layout>
    );
};

export default Shop;