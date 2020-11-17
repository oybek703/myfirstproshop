import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_RESET,
    ORDER_LIST_MY_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_RESET,
    ORDER_PAY_SUCCESS
} from "../actions/types";

const initialState = {
    order: null,
    loading: false,
    error: null
}

export const orderReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case CREATE_ORDER_REQUEST:
            return {...state, loading: true, error: null};
        case CREATE_ORDER_SUCCESS:
            return {...state, loading: false, order: payload};
        case CREATE_ORDER_FAIL:
            return {...state, loading: false, error: payload};
        default:
            return state;
    }
}

export const orderDetailsReducer = (state = {
    order: {}, loading: true, error: null
    }, action) => {
    const {type, payload} = action;
    switch (type) {
        case ORDER_DETAILS_REQUEST:
            return {...state, loading: true, error: null};
        case ORDER_DETAILS_SUCCESS:
            return {...state, loading: false, order: payload};
        case ORDER_DETAILS_FAIL:
            return {...state, loading: false, error: payload};
        default:
            return state;
    }
}

export const orderPayReducer = (state = {loading: false, success: false, error: null}, action) => {
    const {type, payload} = action;
    switch (type) {
        case ORDER_PAY_REQUEST:
            return {...state, loading: true, error: null};
        case ORDER_PAY_SUCCESS:
            return {...state, loading: false, success: true};
        case ORDER_PAY_FAIL:
            return {...state, loading: false, error: payload};
        case ORDER_PAY_RESET:
            return {};
        default:
            return state;
    }
}

export const orderListMyReducer = (state = {orders: [], loading: false, error: null}, action) => {
    const {type, payload} = action;
    switch (type) {
        case ORDER_LIST_MY_REQUEST:
            return {...state, loading: true, error: null};
        case ORDER_LIST_MY_SUCCESS:
            return {...state, loading: false, orders: payload};
        case ORDER_LIST_MY_FAIL:
            return {...state, loading: false, error: payload};
        case ORDER_LIST_MY_RESET:
            return {orders: [], loading: false, error: null};
        default:
            return state;
    }
}

export const orderListReducer = (state = {orders: [], loading: false, error: null}, action ) => {
    const {type, payload} = action;
    switch (type) {
        case ORDER_LIST_REQUEST:
            return {...state, loading: true, error: null};
        case ORDER_LIST_SUCCESS:
            return {...state, loading: false, orders: payload};
        case ORDER_LIST_FAIL:
            return {...state, loading: false, error: payload};
        default:
            return state;
    }
}

