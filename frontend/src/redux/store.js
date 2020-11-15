import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";


const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :  [],
        shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
        paymentMethod: localStorage.getItem('paymentMethod') ? localStorage.getItem('paymentMethod') : 'PayPal'
    },
    userLogin: {userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null},
    userRegister: {userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null}
};

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;