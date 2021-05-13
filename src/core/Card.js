import React ,  {useState} from "react";
import { Link,Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import './style.css'
import { addItem } from "./cartHelper";


const Card = ({ product,showViewProductButton = true }) => {

    const [redirect, setRedirect] = useState(false);
    
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

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        });
    };

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />;
        }
    };

    const showAddToCartButton = () => {
        return (
            <button 
                onClick={addToCart}
                className="btn  btn-sm btn-secondary mt-2 ml-3"
            >
                Add to cart
            </button>
        );
    };

    const showStock = quantity => {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill">In Stock</span>
        ) : (
            <span className="badge badge-primary badge-pill">Out of Stock</span>
        );
    };
    
    return (
        
        <div className="col-xs-12 col-sm-6 col-lg-4 mb-3">
            <div className="card bg-light h-100 p-1 cardhover">
                <div className="card-header text-light font-weight-bold">{product.name}</div>
                <div className="card-body text-dark">
                {shouldRedirect(redirect)}
                <ShowImage item={product} url="product" className="ml-3" />
                    <p className="m-0 p-0">Descrption : {product.description.substring(0, 100)}</p>
                    <p className="font-weight-bold text-warning ">Price : {product.price} Rupees only</p>
                    <Link to={`/product/${product._id}`}>
                        {showViewButton(showViewProductButton)} 
                    </Link>
                    {showAddToCartButton()}
                </div>
            </div>
        </div>
        
    );
};

export default Card;