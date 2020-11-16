import {combineReducers} from "redux";
import productListReducer from "./productList";
import {productDetailsReducer} from "./productDetails";
import cartReducer from "./cart";
import userLoginReducer from "./userLogin";
import userRegisterReducer, {userDetailsReducer} from "./userRegister";
import {orderReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer} from "./orderReducer";
import {userDeleteReducer, usersListReducer} from "./usersReducers";

const rootReducer = combineReducers({
    productlist: productListReducer,
    productdetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    createOrder: orderReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    userList: usersListReducer,
    userDelete: userDeleteReducer
});

export default rootReducer;