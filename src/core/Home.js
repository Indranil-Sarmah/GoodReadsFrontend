import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";

const Home = () => {

    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts("sold").then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts("createdAt").then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout title="Home Page" description="An E-commerce App fro books">
            <h2 className="mb-4 ml-3">New Arrivals</h2>
            <div className="row m-1">
               
                {productsByArrival.map((product, i) => (
                    <Card key={i} product={product} />
                ))}

            </div>  
           

            <h2 className="mb-4 ml-3">Best Sellers</h2>
         
            <div className="row m-1">  
                {productsBySell.map((product, i) => (
                    <Card key={i} product={product} />
                ))}
             </div>
         
        </Layout>
    );
};


export default Home;
