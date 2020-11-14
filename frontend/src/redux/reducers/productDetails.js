import {PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS} from "../actions/types";

const initialState =  {
    product: {},
    loading: false,
    error: null
}

export const productDetailsReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case PRODUCT_DETAILS_REQUEST:
            return {... state, loading: true, error: null};
        case PRODUCT_DETAILS_SUCCESS:
            return {...state, loading: false, error: null, product: payload};
        case PRODUCT_DETAILS_FAIL:
            return {...state, loading: false, error: payload};
        default:
            return state;
    }
}