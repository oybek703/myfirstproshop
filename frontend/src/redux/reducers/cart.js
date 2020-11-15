import {
    CART_ADD_ITEMS,
    CART_REMOVE_ITEMS,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS
} from "../actions/types";

const initialState = {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: 'PayPal'
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
        case CART_SAVE_SHIPPING_ADDRESS:
            return {...state, shippingAddress: payload };
        case CART_SAVE_PAYMENT_METHOD:
            return {...state, paymentMethod: payload}
        default:
            return state;
    }
}


export default cartReducer;