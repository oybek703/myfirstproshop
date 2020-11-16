import {
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST, USER_DELETE_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_LIST_SUCCESS
} from "../actions/types";

export const usersListReducer = (state = {users: [], loading: false, error: null}, action) => {
    const {type, payload} = action;
    switch (type) {
        case USER_LIST_REQUEST:
            return {...state, loading: true, error: null};
        case USER_LIST_SUCCESS:
            return {...state, loading: false, users: payload};
        case USER_LIST_FAIL:
            return {...state, loading: false, error: payload};
        case USER_LIST_RESET:
            return {...state, users: [], loading: false, error: null};
        default:
            return state;
    }
}

export const userDeleteReducer = (state = {loading: false, success: false, error: null}, action) => {
    const {type, payload} = action;
    switch (type) {
        case USER_DELETE_REQUEST:
            return {...state,loading: true, error: null};
        case USER_DELETE_SUCCESS:
            return {...state, loading: false, success: true};
        case USER_DELETE_FAIL:
            return {...state, loading: false, error: payload};
        default:
            return state;
    }
}