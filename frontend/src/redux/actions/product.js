import axios from 'axios';
import {
    PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS
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

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_DELETE_REQUEST});
        await axios.delete(`/api/products/${id}`, {headers: {Authorization: `Bearer ${getState().userLogin.userInfo.token}`}});
        dispatch({type: PRODUCT_DELETE_SUCCESS});
    } catch (e) {
        dispatch({type: PRODUCT_DELETE_FAIL, payload: e.message });
    }
}

export const createProduct = () => async (dispatch, getState) => {
    try {
     dispatch({type: PRODUCT_CREATE_REQUEST});
     const {data} = await axios.post('/api/products', {},
         {headers: {Authorization: `Bearer ${getState().userLogin.userInfo.token}`, 'Content-Type': 'application/json'}});
     dispatch({type: PRODUCT_CREATE_SUCCESS, payload: data});
    } catch (e) {
        dispatch({type: PRODUCT_CREATE_FAIL, payload: e.message});
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_UPDATE_REQUEST});
        await axios.put(`/api/products/${product._id}`, product,
            {headers: {'Content-Type': 'application/json', Authorization: `Bearer ${getState().userLogin.userInfo.token}`}});
        dispatch({type: PRODUCT_UPDATE_SUCCESS});
    } catch (e) {
        dispatch({type: PRODUCT_UPDATE_FAIL, payload: e.message});
    }
}