import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import './style.css'

const Card = ({ product }) => {
    return (
        
        <div className="col-xs-12 col-sm-6 col-lg-4  mb-3">
            <div className="card bg-light h-100 p-1 cardhover">
                <div className="card-header text-light font-weight-bold">{product.name}</div>
                <div className="card-body text-dark">
                <ShowImage item={product} url="product" className="ml-3" />
                    <p className="m-0 p-0">Descrption : {product.description}</p>
                    <p className="font-weight-bold text-warning ">Price : {product.price} Rupees only</p>
                    <Link to="/">
                        <button className="btn btn-sm btn-primary mt-2 ">
                            View Product
                        </button>
                    </Link>
                    <button className="btn  btn-sm btn-secondary mt-2 ml-3">
                        Add to card
                    </button>
                </div>
            </div>
        </div>
        
    );
};

export default Card;