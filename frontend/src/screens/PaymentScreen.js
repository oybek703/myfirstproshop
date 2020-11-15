import React from 'react';
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/Checkoutsteps";
import {Button, Form} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {savePaymentMethod} from "../redux/actions/cart";

const PaymentScreen = ({history}) => {
    const dispatch = useDispatch();
    const {shippingAddress} = useSelector(state => state.cart);
    if(!Object.keys(shippingAddress).length) {
        history.push('/shipping');
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h3 className='text-uppercase'>Payment Method</h3>
            <Form onChange={handleSubmit}>
                <Form.Group controlId='paymentMethod'>
                    <Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        value='PayPal'
                        checked
                        onChange={(e) => dispatch(savePaymentMethod(e.target.value))}
                    />
                </Form.Group>
                <Button type='submit'>
                    <LinkContainer to='/placeorder'><span>Continue</span></LinkContainer>
                </Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;