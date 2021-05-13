import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import './style.css'
import moment from "moment"

const Card3 = ({ product,showViewProductButton = true }) => {
    
    const showViewButton = showViewProductButton => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                    <button className="btn btn-sm btn-primary mt-2 ">
                            View Product
                    </button>
                </Link>
            )
        );
    };

    const showAddToCartButton = () => {
        return (
            <button className="btn  btn-sm btn-secondary mt-2 ml-3">
                 Add to card
             </button>
        );
    };

    const showStock = quantity => {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill ml-4">In Stock</span>
        ) : (
            <span className="badge badge-danger badge-pill ml-4">Out of Stock</span>
        );
    };
    
    return (
        
        <div className="col-xs-12 col-sm-6 col-lg-4 mb-4">
            <div className="card bg-light h-100 p-1 cardhover">
                <div className="card-header text-light font-weight-bold">{product.name}</div>
                <div className="card-body text-dark">
                <ShowImage item={product} url="product" className="ml-3" />
                    <p className="m-0 p-0">Descrption : {product.description.substring(0, 100)}</p>
                    <p className="font-weight-bold text-warning ">Price : {product.price} Rupees only</p>
                    <p className="text-dark">
                        Category: {product.category && product.category.name}
                    </p>
                    <p className="black-8 bg-light">
                        Added on {moment(product.createdAt).fromNow()}
                    </p>

                    {showStock(product.quantity)}
                    <br />

                    {showViewButton(showViewProductButton)}

                    {showAddToCartButton()}
                </div>
            </div>
        </div>
        
    );
};

export default Card3;