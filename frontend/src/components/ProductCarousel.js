import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTops} from "../redux/actions/product";
import Loader from "./Loader";
import Message from "./Message";
import {Carousel, Image} from "react-bootstrap";
import {Link} from "react-router-dom";

const ProductCarousel = () => {
    const dispatch = useDispatch();
    const {products,loading, error} = useSelector(state =>  state.productTop);
    useEffect(() => {
        dispatch(getTops());
    }, []);
    return (
        <>
            {
                loading
                    ? <Loader/>
                    : error
                        ? <Message variant='danger'>Something went wrong. Make sure you are online.</Message>
                        : (
                        <Carousel pause='hover' className='bg-dark mt-3'>
                            {
                                products.map(product => (
                                    <Carousel.Item key={product._id}>
                                        <Link to={`/product/${product._id}`} >
                                            <Image src={product.image} alt={product.name} fluid/>
                                            <Carousel.Caption>
                                                <h4>{product.name} (${product.price})</h4>
                                            </Carousel.Caption>
                                        </Link>
                                    </Carousel.Item>
                                ))
                            }
                        </Carousel>
                    )
            }
        </>
    );
};

export default ProductCarousel;