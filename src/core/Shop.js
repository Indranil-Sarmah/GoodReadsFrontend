import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories,getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import { prices } from "./fixedPrices";
import RadioBox from "./RadioBox";


const Shop = () => {

    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });

    const [categories, setCategories] = useState([]); //state to hold the catefgories from backend
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = () => {   //this will run automatically when components mount and load the categories using getCategories
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const loadFilteredResults = newFilters => {
        // console.log(newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data);
            }
        });
    };

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []); //when components mount

    const handleFilters = (filters, filterBy) => { //filters and filtersBy
        //console.log("SHOP", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues; //whatever we have selected for the price
        }
        loadFilteredResults(myFilters.filters);//this will load the products according to the filters
        setMyFilters(newFilters);
    };

    //extract the value out of the array fixedPrices
    const handlePrice = value => {
        const data = prices;
        let array = []; //the price range defined in the array of fixedPrices

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array; //assigining
            }
        }
        return array;
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