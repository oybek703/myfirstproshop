import React from 'react';
import {Alert} from "react-bootstrap";

const Message = ({variant, text, children}) => {
    return (
        <Alert variant={variant} className='my-2'>
            <Alert.Heading>{text}</Alert.Heading>
            <p>{children}</p>
        </Alert>
    );
};

export default Message;