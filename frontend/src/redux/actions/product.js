import axios from 'axios';
import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS
} from "./types";

export const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST});
        const res = await axios.get('/api/products');
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: res.data});
    } catch (e) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: e.message});
    }
}

export const getProduct = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST});
        const res = await axios.get(`/api/products/${id}`);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: res.data});
    } catch (e) {
        dispatch({type: PRODUCT_DETAILS_FAIL, payload: e.message});
    }
}