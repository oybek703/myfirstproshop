import React from 'react';
import {Container, Row, Col} from "react-bootstrap";

const FormContainer = ({children}) => {
    return (
        <Container className='mt-3'>
            <Row>
                <Col xs={12} className='mx-md-auto' md={6} >{children}</Col>
            </Row>
        </Container>
    );
};

export default FormContainer;