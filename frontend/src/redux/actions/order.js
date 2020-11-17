import axios from 'axios';
import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL,
    ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS
} from "./types";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({type: CREATE_ORDER_REQUEST});
        const {data} = await axios.post('/api/orders', order,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getState().userLogin.userInfo.token}`
                }
            });
        dispatch({type: CREATE_ORDER_SUCCESS, payload: data});
    } catch (e) {
        dispatch({type: CREATE_ORDER_FAIL, payload: e.message});
    }
}

export const getOrderById = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_DETAILS_REQUEST});
        const {data} = await axios.get(`/api/orders/${id}`,
            {headers: {Authorization: `Bearer ${getState().userLogin.userInfo.token}` }});
        dispatch({type: ORDER_DETAILS_SUCCESS, payload: data});
    } catch (e) {
        dispatch({type: ORDER_DETAILS_FAIL, payload: e.message});
    }
}

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_PAY_REQUEST});
        const {data} = await axios.put(`/api/orders/${id}/pay`, paymentResult, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        });
        dispatch({type: ORDER_PAY_SUCCESS, payload: data});
    } catch (e) {
        dispatch({type: ORDER_PAY_FAIL, payload: e.message});
    }
}

export const orderListMy = () => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_LIST_MY_REQUEST});
        const {data} = await axios.get('/api/orders/my', {headers: {Authorization: `Bearer ${getState().userLogin.userInfo.token}`}});
        dispatch({type: ORDER_LIST_MY_SUCCESS, payload: data });
    } catch (e) {
        dispatch({type: ORDER_LIST_MY_FAIL, payload: e.message});
    }
}

export const getOrders = () => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_LIST_REQUEST});
        const {data} = await axios.get('/api/orders', {headers: {Authorization: `Bearer ${getState().userLogin.userInfo.token}`}});
        dispatch({type: ORDER_LIST_SUCCESS, payload: data});
    } catch (e) {
        dispatch({type: ORDER_LIST_FAIL, payload: e.message});
    }
}