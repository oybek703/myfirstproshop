import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart} from "../redux/actions/cart";
import {Col, Row, ListGroup, Image, Form, Button, Card, ListGroupItem} from "react-bootstrap";
import Message from "../components/Message";
import {Link} from "react-router-dom";

const CartScreen = ({match, location, history}) => {
    const dispatch = useDispatch();
    const {cartItems} = useSelector(state => state.cart);
    const qty = Number(location.search.split('=')[1]);
    const {id} = match.params;
    useEffect(() => {
        dispatch(addToCart(id, qty));
    }, []);
    const removeHandler = (id) => {
        dispatch(removeFromCart(id));
    };
    const checkoutHandler = () => {
        history.push('/login?redirect=shipping');
    }
    return (
        <Row className='my-3'>
            <Col md={8}>
                <h2 className='text-uppercase'>Cart Items</h2>
                {
                    !cartItems.length
                        ? <Message variant={'info'} text={'Your cart is empty'}>
                                 <Link to='/'>Back To Shop</Link>
                            </Message>
                        : (<ListGroup variant={'flush'}>
                            {
                                cartItems.map(p => <ListGroup.Item key={p.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={p.image} alt={p.name} fluid rounded />
                                        </Col>
                                        <Col md={4}>
                                            <Link to={`/product/${p.product}`}>{p.name}</Link>
                                        </Col>
                                        <Col md={2}>${p.price}</Col>
                                        <Col md={2}>
                                            <Form.Control as='select' value={p.qty} onChange={(e) => {dispatch(addToCart(p.product, Number(e.target.value)));}}>
                                                {
                                                    [...Array(p.countInStock).keys()].map(i => (
                                                        <option key={`${p.product} - ${i}`} value={i + 1}>{i + 1}</option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button variant='light' onClick={() => {
                                                removeHandler(p.product);
                                            }}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>)
                            }
                            </ListGroup>)
                }
            </Col>
            <Col md={4}>
                <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h4 className='text-uppercase'>
                                    Subtotal ({cartItems.reduce((acc, item) => acc+=item.qty, 0)}) items
                                    <p className='mt-2'>
                                    <strong>${cartItems.reduce((acc, item) => acc+=item.price * item.qty, 0).toFixed(2)}</strong>
                                    </p>
                                </h4>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button
                                    className='btn btn-block'
                                    variant='dark'
                                    onClick={checkoutHandler}
                                    disabled={!cartItems.length}>
                                    PROCEED TO CHECKOUT
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};

export default CartScreen;