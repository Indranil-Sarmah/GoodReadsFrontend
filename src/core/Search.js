import React, { useState, useEffect } from "react";
import { getCategories,list } from "./apiCore";
import Card from "./Card";

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: "",
        search: "",
        results: [],
        searched: false
    });

    const { categories, category, search, results, searched } = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setData({ ...data, categories: data });
            }
        });
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const searchData = () => {
        // console.log(search, category);
        if (search) {
            list({ search: search || undefined, category: category }).then(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setData({ ...data, results: response, searched: true });
                    }
                }
            );
        }
    };

    const searchSubmit = (e) => {
        e.preventDefault();
        searchData();
    };

    const handleChange = (name) => (event) => {
        setData({ ...data, [name]: event.target.value, searched: false });
    };

    const searchedProducts = (results = []) => {
        return (
            <div className="row">
                {results.map((product, i) => (
                    <Card key={i} product={product} />
                ))}
            </div>
        );
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text bg-primary pr-4 pl-4 pt-0 pb-0 m-1 border border-primary col-12">
                <div className="input-group input-group-sm">
                    <div className="input-group-prepend">
                        <select
                            className="btn btn-sm mr-1 p-0 col-xs-4"
                            onChange={handleChange("category")}
                        >
                            <option value="All" className="text-warning">Pick Category</option>
                            {categories.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <input
                        type="search"
                        className="form-control"
                        onChange={handleChange("search")}
                        placeholder="Search by name"
                    />
                </div>
                <div
                    className="btn input-group-append"
                    style={{ border: "none" }}
                >
                    <button className="pt-1 pb-1 pl-3 pr-3 small btn btn-secondary">Search</button>
                </div>
            </span>
        </form>
    );

    return (
        <div className="row">
            <div className="container mb-3">{searchForm()}</div>
            <div className="container-fluid mb-3 m-4">
                {searchedProducts(results)}
            </div>
        </div>
    );
};

export default Search;
