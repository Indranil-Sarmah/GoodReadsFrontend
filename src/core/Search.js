import React, { useState, useEffect } from "react";
import { getCategories } from "./apiCore";
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

    const searchSubmit = () => {
        //
    };

    const handleChange = () => {
        //
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text bg-primary pr-4 pl-4 pt-0 pb-0 m-2 border border-primary">
                <div className="input-group input-group-sm">
                    <div className="input-group-prepend">
                        <select
                            className="btn btn-sm mr-1 p-0"
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
                    <button className="input-group-text pt-0 pb-0 pl-1 pr-1 small">Search</button>
                </div>
            </span>
        </form>
    );

    return (
        <div className="row">
            <div className="container mb-3">{searchForm()}</div>
        </div>
    );
};

export default Search;
