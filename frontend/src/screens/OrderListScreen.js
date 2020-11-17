import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getOrders} from "../redux/actions/order";
import {Container, Table, Button} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Link} from "react-router-dom";

const OrderListScreen = ({history}) => {
    const dispatch = useDispatch();
    const {userInfo} = useSelector(state => state.userLogin);
    const {orders, loading, error} = useSelector(state => state.orderList);
    useEffect(() => {
        if(!userInfo || !userInfo.isAdmin) {
            history.push('/');
        } else {
            dispatch(getOrders());
        }
    }, [userInfo])
    return (
        <Container className='mt-2'>
            <h3>ORDERS LIST</h3>
            {
                loading
                    ? <Loader/>
                    : error
                        ? <Message variant='danger'>Something went wrong. Please try again.</Message>
                        : (
                            <Table className='table-sm' hover bordered striped responsive>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user && order.user.name}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>$ {order.totalPrice}</td>
                                        <td>
                                            {order.isPaid
                                                ? <i className='fas fa-check text-success'></i>
                                                : <i className='fas fa-times text-danger'></i>
                                            }
                                        </td>
                                        <td>
                                            {
                                                order.isDelivered
                                                    ? <i className='fas fa-check text-success'></i>
                                                    : <i className='fas fa-times text-danger'></i>
                                            }
                                        </td>
                                        <td>
                                            <Link to={`/order/${order._id}`}>
                                                <Button className='btn btn-light'>DETAILS</Button>
                                            </Link>
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

export default OrderListScreen;