import {combineReducers} from "redux";
import productListReducer from "./productList";
import {productDetailsReducer} from "./productDetails";
import cartReducer from "./cart";
import userLoginReducer from "./userLogin";
import userRegisterReducer, {userDetailsReducer} from "./userRegister";
import {
    orderReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer
} from "./orderReducer";
import {updateUserReducer, userDeleteReducer, usersListReducer} from "./usersReducers";
import {
    createProductReducer,
    deleteProductReducer,
    productCreateReviewReducer,
    productUpdateReducer
} from "./productsReducers";

const rootReducer = combineReducers({
    cart: cartReducer,
    productlist: productListReducer,
    productdetails: productDetailsReducer,
    productUpdate:  productUpdateReducer,
    productCreateReview: productCreateReviewReducer,
    createProduct: createProductReducer,
    deleteProduct: deleteProductReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    createOrder: orderReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    userList: usersListReducer,
    userDelete: userDeleteReducer,
    updateUser: updateUserReducer
});

export default rootReducer;