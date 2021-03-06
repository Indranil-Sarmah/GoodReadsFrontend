import React, { useState, useEffect } from "react";

const Checkbox = ({ categories,handleFilters }) => {

    const [checked, setCheked] = useState([]);

    const handleToggle = c => () => { //higher order function  //this method will be fired when onchange is happening in the input

        // return the first index or -1
        const currentCategoryId = checked.indexOf(c); //category is already in the cecked state will find that by using indexOf(c) of the category array (Not found return -1 and found then index)
        const newCheckedCategoryId = [...checked];
        // if currently checked was not already in checked state > push
        // else pull/take off
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1); //we take off the category, 1 is denoting only one item
        }
       // console.log(newCheckedCategoryId);
        setCheked(newCheckedCategoryId);//update the state
        handleFilters(newCheckedCategoryId);
    };
    
    //c._id is category id
    return categories.map((c, i) => (
        <li key={i} className="list-unstyled">
            <input onChange={handleToggle(c._id)}  value={checked.indexOf(c._id === -1)} type="checkbox" className="form-check-input" />
            <label className="form-check-label">{c.name}</label>
        </li>
    ));
};

export default Checkbox;
