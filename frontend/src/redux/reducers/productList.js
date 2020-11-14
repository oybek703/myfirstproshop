import {PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS} from "../actions/types";

const initialState = {
    products:[],
    loading: false,
    error: null
}

const productListReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case PRODUCT_LIST_REQUEST:
            return {...state, loading: true, error: null};
        case PRODUCT_LIST_SUCCESS:
            return {...state, loading: false, products: payload, error: null};
        case PRODUCT_LIST_FAIL:
            return {...state, loading: false, error: payload, products: []};
        default:
            return state;
    }
}

export default productListReducer;