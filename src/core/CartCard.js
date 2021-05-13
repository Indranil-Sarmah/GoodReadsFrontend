import React ,  {useState} from "react";
import { Link,Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import './style.css'
import { updateItem,removeItem} from "./cartHelper";




const CartCard = ({ product,showViewProductButton = true,cartUpdate = false,showRemoveProductButton = false}) => {

    
    const [count, setCount] = useState(product.count);
    
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

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button
                    onClick={() => removeItem(product._id)}
                    className="btn btn-sm btn-danger mt-2"
                >
                    Remove Product
                </button>
            )
        );
    };

    const handleChange = productId => event => {
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    };

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div>
                    <div className="input-group input-sm mb-1">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                Adjust Quantity
                            </span>
                        </div>
                        <input
                            type="number"
                            className="form-control"
                            value={count}
                            onChange={handleChange(product._id)}
                        />
                    </div>
                </div>
            )
        );
    };
 
    return (
        
        <div className="col-xs-12 col-sm-12 col-lg-12 mb-3">
                <div className="card-header bg-primary text-warning font-weight-bold mb-2">{product.name}
                <span >{showCartUpdateOptions(cartUpdate)}</span>
                </div>
                <div>
                        {showViewButton(showViewProductButton)} 
                        {showRemoveButton(showRemoveProductButton)}
                </div>
            </div>
        
    );
};

export default CartCard;