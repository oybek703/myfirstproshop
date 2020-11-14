import React, {useEffect, useState} from 'react';
import {Col, Container, Image, ListGroup, ListGroupItem, Row, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import Rating from "../components/Rating";
import {useDispatch, useSelector} from "react-redux";
import {getProduct} from "../redux/actions/producList";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = ({match, history}) => {
    const dispatch = useDispatch();
    const {product, loading, error} = useSelector(state => state.productdetails);
    const [qty, setQty] = useState(0);
    useEffect(() => {
        dispatch(getProduct(match.params.id));
    }, []);
    const handleQty = (e) => {
        setQty(e.target.value);
    }
    const handleAddToCart = () => {
        history.push(`/cart/${product._id}?qty=${qty}`);
    }
    return (
        <>
            {
                loading && !error ? <Loader/> : error ? <Message variant={'danger'}/> : (<>
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
                                        {
                                            product.countInStock > 0 && (
                                                <ListGroupItem>
                                                    <Row>
                                                        <Col>Qty:</Col>
                                                        <Col>
                                                            <Form.Control
                                                                as='select'
                                                                value={qty}
                                                                onChange={handleQty}>
                                                                {
                                                                    [...Array(product.countInStock).keys()].map(x => (
                                                                        <option value={x + 1} key={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroupItem>
                                            )
                                        }
                                        <ListGroupItem>
                                            <button
                                                className='btn btn-block btn-dark'
                                                disabled={product.countInStock === 0 }
                                                onClick={handleAddToCart}>
                                                Add To Cart
                                            </button>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Container>
                    </>)
            }
        </>
    );
};

export default ProductScreen;