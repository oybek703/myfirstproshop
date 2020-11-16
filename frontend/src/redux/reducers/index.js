import {combineReducers} from "redux";
import productListReducer from "./productList";
import {productDetailsReducer} from "./productDetails";
import cartReducer from "./cart";
import userLoginReducer from "./userLogin";
import userRegisterReducer, {userDetailsReducer} from "./userRegister";
import {orderReducer, orderDetailsReducer, orderPayReducer} from "./orderReducer";

const rootReducer = combineReducers({
    productlist: productListReducer,
    productdetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    createOrder: orderReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer
});

export default rootReducer;