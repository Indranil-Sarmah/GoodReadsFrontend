import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => (
    <div className="product-img">
        <img
            src={`${API}/${url}/photo/${item._id}`} //to fetch the image
            alt={item.name}
            className="mb-3"
            style={{  "display": "block",
                "max-width":"800px",
                "max-height":"200px",
                "width":"auto",
                "height":"auto" }}
        />
    </div>
);

export default ShowImage;
