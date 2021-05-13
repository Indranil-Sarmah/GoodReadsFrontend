import React ,  {useState} from "react";
import { Link,Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import './style.css'
import { addItem } from "./cartHelper";

const Card4 = ({ product }) => {

    const [redirect, setRedirect] = useState(false);

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

    return (
        
        <div>
            <div className="card bg-light h-100 p-1 cardhover">
                <div className="card-header text-light font-weight-bold">{product.name}</div>
                <div className="card-body text-dark">
                {shouldRedirect(redirect)}
                <ShowImage item={product} url="product" />
                    <p className="m-0 p-0">Descrption : {product.description.substring(0, 100)}</p>
                    <p className="font-weight-bold text-warning ">Price : {product.price} Rupees only</p>
                    <Link to={`/product/${product._id}`}>
                        <button className="btn btn-sm btn-primary mt-2 ">
                            View Product
                        </button>
                    </Link>
                    {showAddToCartButton()}
                </div>
            </div>
        </div>
        
    );
};

export default Card4;