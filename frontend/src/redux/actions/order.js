import axios from 'axios';
import {CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS} from "./types";

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