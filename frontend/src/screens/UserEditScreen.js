import React, {useEffect, useState} from 'react';
import {Container, Form, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/FormContainer";
import {getUserProfile, updateUserByID} from "../redux/actions/user";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {USER_UPDATE_RESET} from "../redux/actions/types";

const UserEditScreen = ({match, history}) => {
    const dispatch = useDispatch();
    const {user, loading, error} = useSelector(state => state.userDetails);
    const {user: updateUser, success: updateUserSuccess, loading: updateLoading, error: updateError} = useSelector(state => state.updateUser);
    const {userInfo} = useSelector(state => state.userLogin);
    const [name, setName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [email, setEmail] = useState('');
    useEffect(() => {
        if(!userInfo) {
            history.push('/');
        } else {
            if(updateUserSuccess) {
                dispatch({type: USER_UPDATE_RESET});
                history.push('/userslist');
            } else {
                if (!user || !user.name || user._id !== match.params.id) {
                    dispatch(getUserProfile(match.params.id));
                } else {
                    setName(user.name);
                    setEmail(user.email);
                    setIsAdmin(user.isAdmin);
                }
            }
        }
    }, [user, updateUserSuccess])
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserByID({_id: user._id, name, email, isAdmin}));
    }
    return (
        <Container className='mt-4'>
            <Link to='/userslist' className='btn btn-light'>Go Back</Link>
            <FormContainer>
                <h2>EDIT USER</h2>
                {loading
                    ? <Loader/>
                    : error
                        ? <Message variant='danger'>Something went wrong. Please try again.</Message>
                        : <Form onSubmit={handleSubmit}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name:</Form.Label>
                                <Form.Control required placeholder='Enter user name...' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId='email'>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type='email' required placeholder='Enter email address...' value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId='isAdmin'>
                                <Form.Check
                                    value={isAdmin}
                                    onChange={(e) => setIsAdmin(!isAdmin)}
                                    checked={isAdmin}
                                    label='Is Admin'/>
                            </Form.Group>
                            <Button type='submit' variant='primary' disabled={updateLoading}>
                                Update
                            </Button>
                        </Form>
                }
            </FormContainer>
        </Container>
    );
};

export default UserEditScreen;