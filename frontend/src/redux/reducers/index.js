import {combineReducers} from "redux";
import productListReducer from "./productList";
import {productDetailsReducer} from "./productDetails";
import cartReducer from "./cart";

const rootReducer = combineReducers({
    productlist: productListReducer,
    productdetails: productDetailsReducer,
    cart: cartReducer
});

export default rootReducer;