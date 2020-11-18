import React, {useState} from 'react';
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/Checkoutsteps";
import {Button, Form} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {savePaymentMethod} from "../redux/actions/cart";

const PaymentScreen = ({history}) => {
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const {shippingAddress} = useSelector(state => state.cart);
    if(!Object.keys(shippingAddress).length) {
        history.push('/shipping');
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h3 className='text-uppercase'>Payment Method</h3>
            <fieldset>
                <legend>Select Payment Method</legend>
                <Form onSubmit={handleSubmit}>
                <Form.Group controlId='paymentMethod'>
                    <Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        value='PayPal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                </Form.Group>
                <Button type='submit' variant='dark'>
                    Continue
                </Button>
            </Form>
            </fieldset>
        </FormContainer>
    );
};

export default PaymentScreen;