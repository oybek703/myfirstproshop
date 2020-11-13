import React from 'react';
import {Col, Container, Image, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import products from "../products";
import Rating from "../components/Rating";
const ProductScreen = ({match}) => {
    const product = products.find(p => p._id === match.params.id);
    return (
        <>
            <Container className='mt-3'>
                <Link to='/' className='btn btn-light'>Go Back</Link>
                <Row className='my-2'>
                    <Col md={6}>
                        <Image rounded src={product.image} alt={product.name} fluid/>
                    </Col>
                    <Col md={3} >
                        <ListGroup variant='flush'>
                            <ListGroupItem><h4>{product.name}</h4></ListGroupItem>
                            <ListGroupItem>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                            </ListGroupItem>
                                <p className='mt-2'><strong>Description:</strong> {product.description}</p>
                            </ListGroup>
                    </Col>
                    <Col md={3} >
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <Row>
                                <Col>
                                    Price:
                                </Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col><strong>{product.countInStock ? 'In Stock' : 'Out of Stock'}</strong></Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <button className='btn btn-block btn-dark' disabled={product.countInStock === 0 }>Add To Cart</button>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ProductScreen;