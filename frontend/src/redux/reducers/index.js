import {combineReducers} from "redux";
import productListReducer from "./productList";

const rootReducer = combineReducers({
    productlist: productListReducer
});

export default rootReducer;