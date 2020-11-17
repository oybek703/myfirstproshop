import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteUser, listUsers} from "../redux/actions/user";
import {Button, Container, Table, Row, Col} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Link} from "react-router-dom";

const UserListScreen = ({history}) => {
    const {users, loading, error} = useSelector(state => state.userList);
    const {userInfo} = useSelector(state => state.userLogin);
    const {success: userDeleteSuccess} = useSelector(state => state.userDelete);
    const dispatch = useDispatch();
    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?')) {
            dispatch(deleteUser(id));
        }
    }
    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        } else {
            history.push(`/`);
        }
    }, [userInfo, userDeleteSuccess])
    return (
        <Container className='mt-1'>
            <h3>USERS LIST</h3>
            {
                loading
                    ? <Loader/>
                    : error ? <Message variant='danger'>Something went wrong! Please try again later.</Message>
                            : (
                                <Table striped bordered hover responsive className='table-sm'>
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>EMAIL</th>
                                        <th>ADMIN</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users.map(user => (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.name}</td>
                                            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                            <td>{user.isAdmin
                                                ? <i className='fas fa-check text-success'></i>
                                                :<i className='fas fa-times text-danger'></i>}
                                            </td>
                                            <td>
                                                <Row>
                                                    <Col>
                                                        <Link to={`/users/${user._id}/edit`}>
                                                            <Button className='btn btn-sm'><i className='fas fa-edit'></i></Button>
                                                        </Link>
                                                    </Col>
                                                    <Col>
                                                        <Button className='btn btn-sm' variant='danger' onClick={() => deleteHandler(user._id)}>
                                                            <i className='fas fa-trash'></i>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                    )
            }
        </Container>
    );
};

export default UserListScreen;