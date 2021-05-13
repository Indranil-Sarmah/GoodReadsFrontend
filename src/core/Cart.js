import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./cartHelper";
import CartCard from "./CartCard";

const Cart = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getCart());
    }, [items]);

    const showItems = items => {
        return (
            <div>
                <h5 className="ml-3 text-light">Your cart has {`${items.length}`} items</h5>
                <hr className="bg-light"/>
                {items.map((product, i) => (
                    <CartCard key={i} product={product} cartUpdate={true} showRemoveProductButton={true}/>
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h5 className="text-light">
            Your cart is empty. <br/><br/><br/> <Link to="/shop" className="text-warning font-weight-light">Continue shopping</Link>
        </h5>
    );

    return (
        <Layout
            title="Shopping Cart"
            description="Manage your cart items."
            className="container-fluid"
        >
            <div className="row">
                <div className="col-sm-12 col-lg-6 col-md-12">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>

                <div className="col-lg-4">
                    <p>
                        show checkout options/shipping address/total/update
                        quantity
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
