import React, {useEffect, useState} from 'react';
import {Form, Button, Row} from 'react-bootstrap';
import FormContainer from "../components/FormContainer";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../redux/actions/user";
import Message from "../components/Message";

const RegisterScreen = ({location, history}) => {
    const dispatch = useDispatch();
    const {userInfo, loading, error} = useSelector(state => state.userRegister);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const redirect = location.search ? location.search.split('=')[1] : '/';
    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            setMessage('Invalid password confirmation.');
        } else {
            dispatch(register({name, email, password}));
            if(userInfo) {
                history.push('/');
            }
        }
    }
    useEffect(() => {
        if(userInfo) {
            history.push('/');
        }
    }, [userInfo]);
    return (
        <FormContainer>
            <h1 className='text-center'>Sign Up</h1>
            {error && <Message variant='danger'>Invalid user details.</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='name'>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control required placeholder='Enter your name...' type='text' value={name} onChange={(e) => setName(e.target.value) } />
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control required placeholder='Enter your email...' type='email' value={email} onChange={(e) => setEmail(e.target.value) } />
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control required placeholder='Enter your password...' type='password' value={password} onChange={(e) => setPassword(e.target.value) } />
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm password:</Form.Label>
                    <Form.Control placeholder='Confirm your password...' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value) } />
                </Form.Group>
                <Button type='submit' disabled={loading}>Register</Button>
                <Row className='pl-3 py-3'>
                    Already have an account? &nbsp;
                    <Link to={`/login?redirect=${redirect}`}>Login</Link>
                </Row>
            </Form>
        </FormContainer>
    );
};

export default RegisterScreen;