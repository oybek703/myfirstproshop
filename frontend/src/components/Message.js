import React from 'react';
import {Alert} from "react-bootstrap";

const Message = ({variant}) => {
    return (
        <Alert variant={variant} className='my-2'>
            <Alert.Heading>Oops, something went wrong...</Alert.Heading>
            <p>Make sure you are connected to network and try again...</p>
        </Alert>
    );
};

export default Message;