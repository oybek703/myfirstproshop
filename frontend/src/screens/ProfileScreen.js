import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import {getUserProfile, updateUserProfile} from "../redux/actions/user";
import {UPDATE_DETAILS_FAIL, UPDATE_DETAILS_RESET} from "../redux/actions/types";
import {orderListMy} from "../redux/actions/order";
import Loader from "../components/Loader";
import {Link} from "react-router-dom";

const ProfileScreen = ({history}) => {
    const dispatch = useDispatch();
    const {userInfo} = useSelector(state => state.userLogin);
    const {user, loading, success} = useSelector(state => state.userDetails);
    const {orders, loading: orderLoading, error: orderError} = useSelector(state => state.orderListMy);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setPasswordConfirm] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            setMessage('Invalid password confirmation.');
            dispatch({type: UPDATE_DETAILS_FAIL, payload: 'Invalid password confirmation'});
        } else {
            dispatch(updateUserProfile({name, email, password}));
            dispatch({type: UPDATE_DETAILS_RESET});
            setPassword('');
            setPasswordConfirm('');
            setMessage('');
        }
    }
    useEffect(() => {
        if(!userInfo) {
            history.push('/login');
        } else {
            if(!user || !user.name) {
                dispatch(getUserProfile('profile'));
            } else {
                setName(user.name);
                setEmail(user.email);
            }
            setTimeout(() => {
                dispatch({type: UPDATE_DETAILS_RESET});
            }, 2000)
            dispatch(orderListMy());
        }
    }, [userInfo, user, success]);
    return (
            <Row className='mt-5'>
                <Col md={4}>
                    {message && <Message variant='danger'>{message}</Message>}
                    {success && <Message variant='success'>Profile is updated.</Message>}
                    <h3 className='text-uppercase'>User Profile</h3>
                     <Form onSubmit={handleSubmit}>
                        <Form.Group controlId={'name'}>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control placeholder='Enter new name...'
                                          type='text' value={name}
                                          onChange={(e) => setName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId={'email'}>
                            <Form.Label>Email address:</Form.Label>
                            <Form.Control placeholder='Enter new email address...'
                                          type='email' value={email}
                                          onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId={'password'}>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control placeholder='Enter new password...'
                                          type='password' value={password}
                                          onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId={'confirmPassword'}>
                            <Form.Label>Confirm password:</Form.Label>
                            <Form.Control placeholder='Confirm new password...'
                                          type='password' value={confirmPassword}
                                          onChange={(e) => setPasswordConfirm(e.target.value)}/>
                        </Form.Group>
                        <Button type='submit' disabled={loading}>Update</Button>
                    </Form>
                </Col>
                <Col md={8}>
                    <h3>MY ORDERS</h3>
                    {
                        orderLoading
                        ? <Loader/>
                        : orderError
                            ? <Message variant='info'>You have no any orders.</Message>
                            : (
                                <Table striped bordered hover responsive className='table-sm'>
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Paid</th>
                                        <th>Delivered</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        orders.map(order => (
                                            <tr key={order._id}>
                                                <td>{order._id}</td>
                                                <td>{order.createdAt.substring(0, 10)}</td>
                                                <td>{order.totalPrice}</td>
                                                <td>{order.isPaid
                                                    ? order.paidAt.substring(0, 10)
                                                    : (<i className='fas fa-times text-danger'></i>)}
                                                </td>
                                                <td>{order.isDelivered
                                                    ? <i className='fas fa-check text-success'></i>
                                                    : (<i className='fas fa-times text-danger'></i>)}
                                                </td>
                                                <td>
                                                    <Link to={`/order/${order._id}`}>
                                                        <Button className='btn btn-light'>DETAILS</Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </Table>
                            )
                    }
                </Col>
            </Row>
    );
};

export default ProfileScreen;