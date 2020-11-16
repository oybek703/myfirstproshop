import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS, ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS
} from "../actions/types";

const initialState = {
    order: null,
    loading: false,
    error: null
}

export const createOrderReducer = (state = initialState, action) => {
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

