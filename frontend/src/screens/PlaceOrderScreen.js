import React, {useEffect} from 'react';
import CheckoutSteps from "../components/Checkoutsteps";
import {Button ,Card ,Col, Container, Image, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import {Link} from "react-router-dom";
import {createOrder} from "../redux/actions/order";

const PlaceOrderScreen = ({history}) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const {order, error, loading} = useSelector(state => state.createOrder)
    const {cartItems, shippingAddress, paymentMethod} = cart;
    cart.itemsPrice = Number(cartItems.reduce((acc, item) => acc+=item.qty * item.price, 0).toFixed(2));
    cart.shippingPrice = cart.itemsPrice > 100 ? Number((cart.itemsPrice * 0.01).toFixed(2)) : Number(0.00);
    cart.taxPrice = Number((cart.itemsPrice * 0.15).toFixed(2));
    cart.totalPrice = Number(cart.itemsPrice + cart.shippingPrice + cart.taxPrice).toFixed(2);
    const handleCreateOrder = () => {
        dispatch(createOrder({
            shippingAddress,
            orderItems: cartItems,
            shippingPrice: cart.shippingPrice,
            paymentMethod,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }));
    }
    useEffect(() => {
        if(order) {
            history.push(`/order/${order._id}`);
        }
    }, [order]);
    return (<Container>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>SHIPPING</h3>
                            <strong>Address: </strong>
                            {shippingAddress.address} , {shippingAddress.city}  {shippingAddress.postalCode} , {shippingAddress.country}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>PAYMENT METHOD</h3>
                            <strong>Method: </strong>
                            {`"${paymentMethod}"`}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>ORDER ITEMS</h3>
                            <ListGroup variant='flush'>
                                {
                                    !cartItems.length
                                        ? <Message variant='warning' text='Your cart is empty.'/>
                                        : (
                                            cartItems.map(item => (
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
                                            $ {cart.itemsPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <strong>Shipping:</strong>
                                        </Col>
                                        <Col>
                                            $ {cart.shippingPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <strong>Tax:</strong>
                                        </Col>
                                        <Col>
                                            $ {cart.taxPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <strong>Total Price:</strong>
                                        </Col>
                                        <Col>
                                            $ {cart.totalPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {error && <ListGroup.Item>
                                    <Message text='Error while saving order.'/>
                                </ListGroup.Item>}
                                <ListGroup.Item>
                                    <Button
                                        className='btn-block'
                                        variant='dark'
                                        disabled={!cartItems.length || loading}
                                        onClick={handleCreateOrder}>
                                       PLACE ORDER
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>);
};

export default PlaceOrderScreen;