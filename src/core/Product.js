import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read,listRelated } from "./apiCore";
import Card3 from "./Card3";
import Card4 from "./Card4";
import { Link } from "react-router-dom";
import moment from "moment"

const Product = props => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    return (
        <Layout
            title={product && product.name}
            description={
                product.description
            }
            className="container-fluid"
        >

            <div style={{"display":"flex"}}>
            <h5 className="mb-2 mt-0 mr-5">Single Product</h5>
            <Link to="/" className="text-warning" style={{"textDecoration":"none"}}>
                Back to Dashboard
            </Link>
            </div>
            
            <div className="row">{product && product.description && (
                   
                    <Card3 product={product} showViewProductButton={false} />
                    
                    
                )}
                <div className="col-lg-4 text-light mt-5 offset-lg-2 d-none d-lg-block">
                    <h5 className="mb-5 offset">About the product</h5>
                    <p>Name : {product.name}</p>
                    <p>Description : {product.description}</p>
                    <p>
                        Category: {product.category && product.category.name}
                    </p>
                    <p>
                        Added on {moment(product.createdAt).fromNow()}
                    </p>
                    <p>Rating : <span className="fa fa-star checked mr-2" style={{"color":"orange"}}></span>
                            <span className="fa fa-star checked mr-2" style={{"color":"orange"}}> </span>
                            <span className="fa fa-star checked mr-2" style={{"color":"orange"}}> </span>
                            <span className="fa fa-star mr-2" style={{"color":"orange"}}> </span>
                            <span className="fa fa-star mr-2" style={{"color":"orange"}}> </span> </p>
                </div>
                
            </div>


            <p className="text-light">Related products</p>
            <div className="row">
                    {relatedProduct.map((p, i) => (
                           <div className="col-lg-4 col-md-6 col-sm-7 col-xs-12 mb-2">
                            <Card4 key={i} product={p} />
                            </div>
                    ))}
            </div>
             
        </Layout>
    );
};

export default Product;
