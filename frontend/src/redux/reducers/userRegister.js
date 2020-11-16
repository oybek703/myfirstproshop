import {
    UPDATE_DETAILS_FAIL,
    UPDATE_DETAILS_REQUEST, UPDATE_DETAILS_SUCCESS, UPDATE_DETAILS_SUCCESS_DONE,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS
} from "../actions/types";

const initialState = {
    userInfo: null,
    loading: false,
    error: null
}

const userRegisterReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case USER_REGISTER_REQUEST:
            return {...state, loading: true, error: null};
        case USER_REGISTER_SUCCESS:
            return {...state, loading: false, error: null, userInfo: payload};
        case USER_REGISTER_FAIL:
            return {...state, loading: false, error: payload};
        default:
            return state;
    }
}

export const userDetailsReducer = (state = {user: {}, loading: false, error: null, success: false}, action) => {
    const {type, payload} = action;
    switch (type) {
        case USER_DETAILS_REQUEST:
        case UPDATE_DETAILS_REQUEST:
            return {...state, loading: true, error: null, success: false};
        case USER_DETAILS_SUCCESS:
        case UPDATE_DETAILS_SUCCESS:
            return {...state ,loading: false, user: payload, error: null, success: true};
        case USER_DETAILS_FAIL:
        case UPDATE_DETAILS_FAIL:
            return {...state, loading: false, error: payload, success: false};
        case UPDATE_DETAILS_SUCCESS_DONE:
            return {...state, success: false};
        default:
            return state;
    }
}

export default userRegisterReducer;