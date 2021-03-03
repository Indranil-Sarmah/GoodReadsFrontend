import React from "react";
import { Link } from "react-router-dom";

const Card = ({ product }) => {
    return (
        
        <div className="col-xs-12 col-sm-6 col-lg-3  mb-3">
            <div className="card bg-light h-100">
                <div className="card-header text-light font-weight-bold">{product.name}</div>
                <div className="card-body text-dark">
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                    <Link to="/">
                        <button className="btn btn-sm btn-primary mt-2 mb-2">
                            View Product
                        </button>
                    </Link>
                    <button className="btn  btn-sm btn-secondary mt-2 mb-2 ml-3">
                        Add to card
                    </button>
                </div>
            </div>
        </div>
        
    );
};

export default Card;