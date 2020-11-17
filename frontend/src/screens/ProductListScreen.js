import React, {useEffect} from 'react';
import {Container, Table, Row, Col, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {createProduct, deleteProduct, getAllProducts} from "../redux/actions/product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Link} from "react-router-dom";
import {PRODUCT_CREATE_RESET} from "../redux/actions/types";

const ProductListScreen = ({history}) => {
    const dispatch = useDispatch();
    const {products, loading, error} = useSelector(state => state.productlist);
    const {userInfo} = useSelector(state => state.userLogin);
    const {product, success: createProductSuccess, loading: createProductLoading} = useSelector(state => state.createProduct);
    const {success: deleteProductSuccess, error: deleteProductError, loading: deleteProductLoading } = useSelector(state => state.deleteProduct);
    const createProductHandler = () => {
        dispatch(createProduct());
    }
    const deleteProductHandler = (id) => {
        if(window.confirm('Are you sure?')) {
            dispatch(deleteProduct(id));
        }
    }
    useEffect(() => {
        if(!userInfo || !userInfo.isAdmin) {
            history.push('/');
        } else {
        if(createProductSuccess) {
            dispatch({type: PRODUCT_CREATE_RESET});
            history.push(`/products/${product._id}/edit`);
        } else {
            dispatch(getAllProducts());
        }
    }
    }, [deleteProductSuccess, userInfo, createProductSuccess]);
    return (
        <Container className='mt-3'>
            <Row className='d-flex align-items-center justify-content-between'>
                <Col>
                    <h3>PRODUCTS LIST</h3>
                </Col>
                <Col className='text-right'>
                    <Button onClick={createProductHandler} disabled={loading || deleteProductLoading || createProductLoading}><i className='fas fa-plus'></i> CREATE PRODUCT</Button>
                </Col>
            </Row>
            {deleteProductError && <Message variant='danger'>Something went wrong. Please try again.</Message>}
            {
                loading || deleteProductLoading
                    ? <Loader/>
                    : error
                        ? <Message variant='danger'>Something went wrong. Please try again.</Message>
                        : (
                            <Table bordered hover responsive striped className='table-sm'>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map(product => (
                                            <tr key={product._id}>
                                                <td>{product._id}</td>
                                                <td>{product.name}</td>
                                                <td>{product.price}</td>
                                                <td>{product.category}</td>
                                                <td>{product.brand}</td>
                                                <td>
                                                    <Row>
                                                        <Col>
                                                            <Link to={`/products/${product._id}/edit`}>
                                                                <Button className='btn-sm'>
                                                                    <i className='fas fa-edit'></i>
                                                                </Button>
                                                            </Link>
                                                        </Col>
                                                        <Col>
                                                            <Button className='btn-sm' variant='danger' onClick={() => deleteProductHandler(product._id)}>
                                                                <i className='fas fa-trash'></i>
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                    )
            }
        </Container>
    );
};

export default ProductListScreen;