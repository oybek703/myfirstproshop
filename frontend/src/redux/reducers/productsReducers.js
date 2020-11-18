import {
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_RESET, PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_RESET,
    PRODUCT_UPDATE_SUCCESS
} from "../actions/types";

export const deleteProductReducer = (state = {success: false, loading: false, error: null}, action) => {
    const {type, payload} = action;
    switch (type) {
        case PRODUCT_DELETE_REQUEST:
            return {...state, loading: true, error: null, success: false};
        case PRODUCT_DELETE_SUCCESS:
            return {...state, loading: false, success: true};
        case PRODUCT_DELETE_FAIL:
            return {...state, loading: false, error: payload};
        default:
            return state;
    }
}

export const createProductReducer = (state = {loading: false, error: null, product: {}, success: false}, action) => {
    const {type, payload} = action;
    switch (type) {
        case PRODUCT_CREATE_REQUEST:
            return {...state, loading: true, error: null, success: false};
        case PRODUCT_CREATE_SUCCESS:
            return {...state, loading: false, product: payload, success: true};
        case PRODUCT_CREATE_FAIL:
            return {...state, loading: false, error: payload};
        case PRODUCT_CREATE_RESET:
            return {product: {}};
        default:
            return state;
    }
}

export const productUpdateReducer = (state = {loading: false, error: null, success: false}, action) => {
    const {type, payload} = action;
    switch (type) {
        case PRODUCT_UPDATE_REQUEST:
            return {...state, loading: true, success: false, error: null};
        case PRODUCT_UPDATE_SUCCESS:
            return {...state, loading: false, success: true};
        case PRODUCT_UPDATE_FAIL:
            return {...state, loading: false, error: payload};
        case PRODUCT_UPDATE_RESET:
            return {};
        default:
            return state;
    }
}

export const productCreateReviewReducer = (state = {loading: false, success: false, error: null}, action) => {
    const {type, payload} = action;
    switch (type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {...state, loading: true, error: null};
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {...state, loading: false, success: true};
        case PRODUCT_CREATE_REVIEW_FAIL:
            return {...state, loading: false, error: payload};
        case PRODUCT_CREATE_REVIEW_RESET:
            return {loading: false, error: null, success: false};
        default:
            return state;
    }
}