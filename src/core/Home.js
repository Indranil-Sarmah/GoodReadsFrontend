import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from './Search';


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
        <Layout title="Home Page" description="An E-commerce App for books">
          
            <h3 className="mb-2 ml-4 text-light">New Arrivals</h3>
            <div className="row m-1">
               
                {productsByArrival.map((product, i) => (
                    <Card key={i} product={product} />
                ))}

            </div>  
           

            <h3 className="mb-4 ml-4 text-light">Best Sellers</h3>
         
            <div className="row m-1">  
                {productsBySell.map((product, i) => (
                    <Card key={i} product={product} />
                ))}
             </div>
         
        </Layout>   
    );
};


export default Home;
