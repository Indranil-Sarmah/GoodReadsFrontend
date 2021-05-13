import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./cartHelper";
import CartCard from "./CartCard";

const Cart = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getCart());
    }, []);

    const showItems = items => {
        return (
            <div>
                <h5 className="ml-3">Your cart has {`${items.length}`} items</h5>
                <hr />
                {items.map((product, i) => (
                    <CartCard key={i} product={product} cartUpdate={true}/>
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <p>
            Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
        </p>
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
