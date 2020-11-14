import {CART_ADD_ITEMS, CART_REMOVE_ITEMS} from "../actions/types";

const initialState = {
    cartItems: []
}

const cartReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case CART_ADD_ITEMS:
            const existItem = state.cartItems.find(item => item.product === payload.product);
            if(existItem) {
                return {...state, cartItems: state.cartItems.map(i => i.product === existItem.product ? payload : i )};
            } else {
                return {...state, cartItems: [...state.cartItems, payload]};
            }
        case CART_REMOVE_ITEMS:
            return {...state, cartItems: state.cartItems.filter(item => item.product !== payload)};
        default:
            return state;
    }
}


export default cartReducer;