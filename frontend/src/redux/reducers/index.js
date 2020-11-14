import {combineReducers} from "redux";
import productListReducer from "./productList";
import {productDetailsReducer} from "./productDetails";

const rootReducer = combineReducers({
    productlist: productListReducer,
    productdetails: productDetailsReducer
});

export default rootReducer;