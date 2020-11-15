import {combineReducers} from "redux";
import productListReducer from "./productList";
import {productDetailsReducer} from "./productDetails";
import cartReducer from "./cart";
import userLoginReducer from "./userLogin";
import userRegisterReducer, {userDetailsReducer} from "./userRegister";

const rootReducer = combineReducers({
    productlist: productListReducer,
    productdetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer
});

export default rootReducer;