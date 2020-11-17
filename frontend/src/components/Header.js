import React from 'react';
import {Container, Navbar, NavDropdown} from "react-bootstrap";
import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/actions/user";

const Header = () => {
    const {userInfo} = useSelector(state => state.userLogin);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    }
    return (
        <header>
            <Navbar bg="dark" expand="lg" variant='dark'>
                <Container>
                    <Link to='/'>
                        <Navbar.Brand>PROSHOP</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <i className='fas fa-shopping-cart'></i> {' '}
                                    CART
                                </Nav.Link>
                            </LinkContainer>
                            {
                                userInfo ? (
                                    <>
                                        {userInfo.isAdmin && (<NavDropdown id='admin' title='ADMIN'>
                                            <LinkContainer to='/userslist'>
                                                <NavDropdown.Item>Users</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to='/productslist'>
                                                <NavDropdown.Item>Products</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to='/orderslist'>
                                                <NavDropdown.Item>Orders</NavDropdown.Item>
                                            </LinkContainer>
                                        </NavDropdown>)}
                                        <NavDropdown title={userInfo.name} id='username'>
                                            <LinkContainer to='/profile'>
                                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                            </LinkContainer>
                                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                        </NavDropdown>
                                    </>
                                    )
                                     : (
                                    <LinkContainer to='/login'>
                                        <Nav.Link>
                                            <i className='fas fa-user'></i> {' '}
                                            SIGN IN
                                        </Nav.Link>
                                    </LinkContainer>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;