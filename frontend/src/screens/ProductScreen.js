import React, {useEffect, useState} from 'react';
import {Col, Container, Image, ListGroup, ListGroupItem, Row, Form, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import Rating from "../components/Rating";
import {useDispatch, useSelector} from "react-redux";
import {createReview, getProduct} from "../redux/actions/product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {PRODUCT_CREATE_REVIEW_RESET} from "../redux/actions/types";

const ProductScreen = ({match, history}) => {
    const dispatch = useDispatch();
    const {product, loading, error} = useSelector(state => state.productdetails);
    const {userInfo} = useSelector(state => state.userLogin);
    const {loading: reviewLoading, error: reviewError, success: reviewSuccess} = useSelector(state => state.productCreateReview);
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    useEffect(() => {
            dispatch(getProduct(match.params.id));
            if(reviewSuccess) {
                setComment('');
                setRating(1);
            }
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET});
    }, [userInfo, reviewSuccess]);
    const handleQty = (e) => {
        setQty(e.target.value);
    }
    const handleAddToCart = () => {
        history.push(`/cart/${product._id}?qty=${qty}`);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createReview(match.params.id, {rating, comment}));
    }
    return (
        <>
            {
                loading && !error
                    ? <Loader/>
                    : error
                    ? <Message variant={'danger'} text={'Oops, something went wrong!'}>
                        Make sure you are connected to network and try again...
                    </Message>
                        : (<>
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
                            <Row className='mt-4'>
                                <Col>
                                    <h4>WRITE COMMENT:</h4>
                                    {
                                        userInfo
                                            ? (<Form onSubmit={handleSubmit}>
                                                {reviewError && (<Message variant='danger'>Product is already reviewed.</Message>)}
                                                <Form.Group controlId='rating'>
                                                    <Form.Label>Rating:</Form.Label>
                                                    <Form.Control required as='select' value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                                                        <option value='1' >1 - Poor</option>
                                                        <option value='2' >2 - Fair</option>
                                                        <option value='3' >3 - Good</option>
                                                        <option value='4' >4 - Very Good</option>
                                                        <option value='5' >5 - Excellent</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId='comment'>
                                                    <Form.Label>Comment:</Form.Label>
                                                    <Form.Control onChange={(e) => setComment(e.target.value)} required as='textarea' placeholder='Leave your comment...'/>
                                                </Form.Group>
                                            <Button type='submit' disabled={reviewLoading}>SUBMIT</Button>
                                            </Form>)
                                            : <Message variant='info'>Please <Link to='/login'>Sign In</Link> if you want to leave comment.</Message>
                                    }
                                </Col>
                                <Col>
                                    <h4>REVIEWS</h4>
                                    {userInfo && (
                                        <>
                                            {
                                                !product.reviews.length
                                                    ? (<p className='text-muted lead font-italic'>No any reviews yet...</p>)
                                                    : <ListGroup variant='flush'>
                                                        {
                                                            product.reviews.map(review => (
                                                                <ListGroup.Item key={review._id}>
                                                                    <h4>{review.name}</h4>
                                                                    <Rating value={review.rating} text={review.rating}/>
                                                                    <p>{review.comment}</p>
                                                                    <p>{review.createdAt.substring(0,10)}</p>
                                                                </ListGroup.Item>
                                                            ))
                                                        }
                                                    </ListGroup>
                                            }
                                        </>
                                    )}
                                </Col>
                            </Row>
                        </Container>
                    </>)
            }
        </>
    );
};

export default ProductScreen;