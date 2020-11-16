import axios from 'axios';
import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS
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
        console.log(e)
        dispatch({type: ORDER_DETAILS_FAIL, payload: e.message});
    }
}