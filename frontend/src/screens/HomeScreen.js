import React from 'react';
import products from "../products";
import Product from "../components/Product";
import {Col, Row} from "react-bootstrap";
const HomeScreen = () => {
    return (
        <>
            <h2 className='text-uppercase my-1'>Latest Products</h2>
            <Row>
                {
                    products.map(product => (
                        <Col sm={12} md={3} lg={4} key={product._id}>
                            <Product key={product._id} product={product}/>
                        </Col>
                        )
                    )
                }
            </Row>
        </>
    )
};

export default HomeScreen;