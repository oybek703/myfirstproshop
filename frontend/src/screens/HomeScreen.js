import React, {useEffect} from 'react';
import Product from "../components/Product";
import {Col, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts} from "../redux/actions/product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import {Link} from "react-router-dom";
const HomeScreen = ({match}) => {
    const {keyword, pageNumber} = match.params;
    const dispatch = useDispatch();
    const {products, error, loading, pages, page} = useSelector(state => state.productlist);
    useEffect(() => {
        dispatch(getAllProducts(keyword, pageNumber));
    }, [keyword, pageNumber]);
    return (
        <>
            <Meta/>
            {!keyword ? <ProductCarousel/> : <Link to='/' className='btn btn-light mt-2'>Go Back</Link>}
        {
            loading && !error
                ? <Loader/>
                : error
                ? <Message variant={'danger'} text={'Oops, something went wrong!'}>
                    Make sure you are connected to network and try again...
                </Message>
                : <>
                <h2 className='text-uppercase my-1'>Latest Products</h2>
                <Row>
                    {
                        !products.length ? <p className='lead text-muted ml-2 font-italic'>No any products in shop.</p> :
                        products.map(product => (
                                <Col sm={6} md={4} lg={4} key={product._id}>
                                    <Product key={product._id} product={product}/>
                                </Col>
                            )
                        )
                    }
                </Row>
                <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
            </>
        }
        </>
    )
};

export default HomeScreen;