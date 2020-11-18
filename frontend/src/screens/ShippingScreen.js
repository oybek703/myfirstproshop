import React, {useState} from 'react';
import FormContainer from "../components/FormContainer";
import {Form, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {saveShippingAddress} from "../redux/actions/cart";
import CheckoutSteps from "../components/Checkoutsteps";
import {LinkContainer} from 'react-router-bootstrap';

const ShippingScreen = ({history}) => {
    const {shippingAddress} = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({city, address, postalCode, country}));
        history.push('/payment');
    }
    return (
        <FormContainer>
            <CheckoutSteps step1  step2/>
            <h3 className='text-uppercase'>Shipping</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId={'address'}>
                    <Form.Label>Address:</Form.Label>
                    <Form.Control
                        type={'text'}
                        placeholder={'Enter shipping address..'}
                        value={address}
                        required
                    onChange={(e) => setAddress(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId={'city'}>
                    <Form.Label>City:</Form.Label>
                    <Form.Control
                        type={'text'}
                        placeholder={'Enter city..'}
                        value={city}
                        required
                    onChange={(e) => setCity(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId={'postalCode'}>
                    <Form.Label>Postal Code:</Form.Label>
                    <Form.Control
                        type={'text'}
                        placeholder={'Enter postal code..'}
                        value={postalCode}
                        required
                    onChange={(e) => setPostalCode(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId={'country'}>
                    <Form.Label>Country:</Form.Label>
                    <Form.Control
                        type={'text'}
                        placeholder={'Enter country..'}
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}/>
                </Form.Group>
                <Button type='submit' variant='dark'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ShippingScreen;