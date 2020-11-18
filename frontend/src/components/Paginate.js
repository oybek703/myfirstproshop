import React from 'react';
import {Pagination} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

const Paginate = ({pages, page, keyword = '', isAdmin = false}) => {
    return pages > 1 &&
        (
            <Pagination className='mt-3'>
            {
                [...Array(pages).keys()].map(x => (
                    <LinkContainer className='mr-2' key={x+1}
                                   to={ !isAdmin ? keyword ? `/search/${keyword}/page/${x+1}` : `/page/${x+1}` : `/productslist/${x+1}`}>
                        <Pagination.Item active={x+1 === page}>{x+1}</Pagination.Item>
                    </LinkContainer>
                ))
            }
        </Pagination>
    );
};

export default Paginate;