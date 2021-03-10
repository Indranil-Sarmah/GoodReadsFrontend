import React, { useState, useEffect } from "react";

const RadioBox = ({ prices,handleFilters }) => {  //grab price as props from shop component
    const [value, setValue] = useState(0);

    const handleChange = (event) => {
        handleFilters(event.target.value); //any time ther is change in input type radio we have to update it
        setValue(event.target.value);
    };

    return prices.map((p, i) => (
        <div key={i}>
            <input
                onChange={handleChange}
                value={`${p._id}`}
                name={p}  //to select only one radio button
                type="radio"
                className="mr-2 ml-4"
            />
            <label className="form-check-label">{p.name}</label>
        </div>
    ));
};

export default RadioBox;
