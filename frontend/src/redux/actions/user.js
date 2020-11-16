import axios from 'axios';
import {
    ORDER_LIST_MY_RESET,
    UPDATE_DETAILS_FAIL,
    UPDATE_DETAILS_REQUEST, UPDATE_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT, USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS
} from "./types";

export const login = ({email, password}) => async (dispatch, getState) => {
    try {
        dispatch({type: USER_LOGIN_REQUEST});
        const {data} = await axios.post('/api/users/login', {email,password}, {headers: {'Content-Type': 'application/json'}});
        dispatch({type: USER_LOGIN_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(getState().userLogin.userInfo));
    } catch (e) {
        dispatch({type: USER_LOGIN_FAIL, payload: e.message});
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({type: ORDER_LIST_MY_RESET});
    dispatch({type: USER_DETAILS_RESET});
    dispatch({type: USER_LOGOUT});
}

export const register = (formData) => async (dispatch, getState) => {
    try {
        dispatch({type: USER_REGISTER_REQUEST});
        const {data} = await axios.post('/api/users/register', formData, {headers: {'Content-Type': 'application/json'}});
        dispatch({type: USER_REGISTER_SUCCESS, payload: data});
        dispatch({type: USER_LOGIN_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(getState().userRegister.userInfo));
    } catch (e) {
        dispatch({type: USER_REGISTER_FAIL, payload: e.message});
    }
}

export const getUserProfile = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: USER_DETAILS_REQUEST});
        const {data} = await axios.get(`/api/users/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getState().userLogin.userInfo.token}`
                }
            });
        dispatch({type: USER_DETAILS_SUCCESS, payload: data});
    } catch (e) {
        dispatch({type: USER_DETAILS_FAIL, payload: e.message});
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({type: UPDATE_DETAILS_REQUEST});
        const {data} = axios.put('/api/users/profile', user, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        });
        dispatch({type: UPDATE_DETAILS_SUCCESS, payload: data});
    } catch(e) {
       dispatch({type: UPDATE_DETAILS_FAIL, payload: e.message});
    }
}