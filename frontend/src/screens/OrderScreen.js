import React, {useEffect} from 'react';
import {Card, Col, Container, Image, ListGroup, Row} from "react-bootstrap";
import Message from "../components/Message";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import {getOrderById} from "../redux/actions/order";

const OrderScreen = ({match}) => {
    const dispatch = useDispatch();
    const {order, loading, error, } = useSelector(state => state.orderDetails);
    const {shippingAddress} = order;
    if(!loading) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc += item.price * item.qty, 0).toFixed(2);
    }
    useEffect(() => {
        dispatch(getOrderById(match.params.id));
    }, []);
    return (
        <div className='mt-4'>
            {loading ? <Loader/> : error ? <Message variant='danger' text='Error! Please try again.'/>  : <Container>
                <h3>ORDER {order._id}</h3>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h4>SHIPPING</h4>
                                <p>Name: {order.user.name}</p>
                                <p>Email: <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                                <strong>Address: </strong>
                                {shippingAddress.address} , {shippingAddress.city}  {shippingAddress.postalCode} , {shippingAddress.country}
                                {!order.isDelivered && <Message variant='warning'>Not delivered.</Message>}
                            </ListGroup.Item>
                            {/*<*/}
                            <ListGroup.Item>
                                <h3>PAYMENT METHOD</h3>
                                <strong>Method: </strong>
                                {`"${order.paymentMethod}"`}
                                {!order.isPaid && <Message variant='warning' >Not paid.</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h3>ORDER ITEMS</h3>
                                <ListGroup variant='flush'>
                                    {
                                        !order.orderItems.length
                                            ? <Message variant='warning' text='Your cart is empty.'/>
                                            : (
                                                order.orderItems.map(item => (
                                                    <ListGroup.Item key={item.product}>
                                                        <Row>
                                                            <Col md={2}><Image src={item.image} rounded fluid/></Col>
                                                            <Col md={6}>
                                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                            </Col>
                                                            <Col md={4}>
                                                                {item.qty} x ${item.price} = $ {Number((item.qty * item.price).toFixed(2))}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))
                                            )
                                    }
                                </ListGroup>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <ListGroup variant='flush'>
                                    <h3>ORDER SUMMARY</h3>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                <strong>Items:</strong>
                                            </Col>
                                            <Col>
                                                $ {order.itemsPrice}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                <strong>Shipping:</strong>
                                            </Col>
                                            <Col>
                                                $ {order.shippingPrice}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                <strong>Tax:</strong>
                                            </Col>
                                            <Col>
                                                $ {order.taxPrice}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                <strong>Total Price:</strong>
                                            </Col>
                                            <Col>
                                                $ {order.totalPrice}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>}
        </div>
    );
};

export default OrderScreen;