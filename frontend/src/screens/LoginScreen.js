import React, {useEffect, useState} from 'react';
import {Form, Button, Row}  from 'react-bootstrap';
import FormContainer from "../components/FormContainer";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../redux/actions/user";
import Message from "../components/Message";


const LoginScreen = ({location, history}) => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const {userInfo, error, loading} = useSelector(state => state.userLogin);
    const [password, setPassword] = useState('');
    const redirect = location.search ? location.search.split('=')[1] : '/';
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({email, password}));
        setEmail('');
        setPassword('');
    }
    useEffect(() => {
        if(userInfo) {
            history.push(redirect);
        }
    }, [userInfo]);
    return (
        <FormContainer>
            <h1 className='text-center'>Sing In</h1>
            {error && <Message variant={'danger'}>Invalid credentials!</Message>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='email'>
                    <Form.Label>Email address:</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email address...'
                        value={email}
                        onChange={(e) => setEmail(e.target.value) }/>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type='password' value={password} placeholder='Enter your password...'
                    onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <Button type='submit' disabled={loading}>Sing In </Button>
            </Form>
            <Row className='py-3 pl-3'>
                New Customer? &nbsp;
                <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}> Register</Link>
            </Row>
        </FormContainer>
    );
};

export default LoginScreen;