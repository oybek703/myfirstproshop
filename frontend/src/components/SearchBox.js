import React, {useEffect, useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom'
const SearchBox = ({history}) => {
    const [keyword, setKeyword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if(keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/');
        }
    }
    return (
        <Form onSubmit={handleSubmit} inline>
            <Form.Group controlId='search'>
                <Form.Control placeholder='Enter search text...' type='text' value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
            </Form.Group>
            <Button className='ml-3' type='submit' variant='btn btn-outline-success'>Search</Button>
        </Form>
    );
};

export default withRouter(SearchBox);