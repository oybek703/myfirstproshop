import {USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT} from "../actions/types";

const initialState = {
    userInfo: null,
    loading: false,
    error: null
}

const userLoginReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case USER_LOGIN_REQUEST:
            return {...state, loading: true, error: null};
        case USER_LOGIN_SUCCESS:
            return {...state, loading: false, error: null, userInfo: payload};
        case USER_LOGIN_FAIL:
            return {...state, loading: false, error: payload};
        case USER_LOGOUT:
            return {...state, error: null, userInfo: null, loading: false};
        default:
            return state;
    }
}

export default userLoginReducer;