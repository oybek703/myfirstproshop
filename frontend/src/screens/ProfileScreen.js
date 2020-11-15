import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import {getUserProfile, updateUserProfile} from "../redux/actions/user";
import {UPDATE_DETAILS_FAIL} from "../redux/actions/types";
import {load} from "dotenv";

const ProfileScreen = ({history}) => {
    const dispatch = useDispatch();
    const {userInfo} = useSelector(state => state.userLogin);
    const {user, loading, success} = useSelector(state => state.userDetails);
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
            setPassword('');
            setPasswordConfirm('');
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
        }
    }, [user]);
    return (
            <Row className='mt-5'>
                <Col md={4}>
                    {
                        message && !success && !loading
                            ? <Message variant='danger'>{message}</Message>
                            : success && <Message variant='success'>Profile updated.</Message>
                    }
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
                    <h3 className='text-center'>My Orders</h3>
                </Col>
            </Row>
    );
};

export default ProfileScreen;