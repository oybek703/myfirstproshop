import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Container, Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import FormContainer from "../components/FormContainer";
import {useDispatch, useSelector} from "react-redux";
import {getProduct, updateProduct} from "../redux/actions/product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {PRODUCT_UPDATE_RESET} from "../redux/actions/types";

const ProductEditScreen = ({match, history}) => {
    const dispatch = useDispatch();
    const {product, loading, error} = useSelector(state => state.productdetails);
    const {success: updateSuccess, loading: updateLoading, error: updateError} = useSelector(state => state.productUpdate);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('/images/sample.jpg');
    const [brand, setBrand] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProduct({_id: match.params.id ,name, price, image, brand, countInStock, category, description}));
    }
    const fileUploadHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        try {
            const {data} = await axios.post('/api/uploads',
                formData,
                {headers: {'Content-Type': 'multipart/form-data'}}
                );
            setImage(data);
            setUploading(false);
        } catch (e) {
            console.error(e);
            setUploading(false);
        }
    }
    useEffect(() => {
        if(updateSuccess) {
            dispatch({type: PRODUCT_UPDATE_RESET});
            history.push(`/productslist`);
        } else {
            if(!product || !product.name || product._id !== match.params.id) {
                dispatch(getProduct(match.params.id));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCountInStock(product.countInStock);
                setCategory(product.category);
                setDescription(product.description);
            }
        }
    }, [product, updateSuccess]);
    return (
        <Container className='mt-3'>
            <Link to='/productslist'>
                <Button className='btn btn-light'>Go Back</Button>
            </Link>
            {updateError && <Message variant='danger'>Something went wrong. Please try again.</Message>}
            {
                loading
                    ? <Loader/>
                    : error
                        ? <Message variant='danger'>Something went wrong please try again later.</Message>
                        : (<FormContainer>
                        <h3>EDIT PRODUCT</h3>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name:</Form.Label>
                                <Form.Control type='text' placeholder='Enter product name...'
                                              value={name} onChange={(e) => setName(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId='price'>
                                <Form.Label>Price:</Form.Label>
                                <Form.Control min={0} type='number' placeholder='Enter product price...'
                                              value={price} onChange={(e) => setPrice(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId='image'>
                                <Form.Label>Image:</Form.Label>
                                <Form.Control type='text' placeholder='Enter image url...'
                                              value={image} onChange={(e) => setImage(e.target.value)}/>
                                <Form.File disabled={uploading} id='image-upload' custom label='Choose file' onChange={fileUploadHandler}></Form.File>
                            </Form.Group>
                            <Form.Group controlId='brand'>
                                <Form.Label>Brand:</Form.Label>
                                <Form.Control type='text' placeholder='Enter brand...'
                                              value={brand} onChange={(e) => setBrand(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId='countInStock'>
                                <Form.Label>Count in Stock:</Form.Label>
                                <Form.Control min={0} type='number' placeholder='Enter product count in stock...'
                                              value={countInStock} onChange={(e) => setCountInStock(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId='category'>
                                <Form.Label>Category:</Form.Label>
                                <Form.Control type='text' placeholder='Enter category...'
                                              value={category} onChange={(e) => setCategory(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId='description'>
                                <Form.Label>Description:</Form.Label>
                                <Form.Control type='text'as='textarea' placeholder='Enter description...'
                                              value={description} onChange={(e) => setDescription(e.target.value)}/>
                            </Form.Group>
                            <Button type='submit' disabled={updateSuccess}>Update</Button>
                        </Form>
                    </FormContainer>)
            }
        </Container>
    );
};

export default ProductEditScreen;