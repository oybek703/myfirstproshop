import React from 'react';
import {Container, Navbar} from "react-bootstrap";
import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap';

const Header = () => {
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
                            <LinkContainer to='/login'>
                                <Nav.Link>
                                    <i className='fas fa-user'></i> {' '}
                                    SIGN IN
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;