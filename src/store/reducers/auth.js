import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../utility/utility';

const initialState = {
    token: null,
    data: null,
    error: null,
    loading: false,
    mobile_number: null,
    authRedirectPath: '/'
};

const signUpStart = (state, action) => {
    return updatedObject(state, { error: null, loading: true });
};

const signUpSuccess = (state, action) => {
    return updatedObject(state, { loading: false});
};

const signUpFail = (state, action) => {
    return updatedObject(state,  { error: action.error, loading: false });
}

const authInitStart = (state, action) => {
    return updatedObject(state, { error: null, loading: true});
};

const authInitSuccess = (state, action) => {
    return updatedObject(state, { 
        error: null,
        loading: false,
        mobile_number: action.mobile_number
    });
};

const authInitFail = (state, action) => {
    return updatedObject(state, { error: action.error, loading: false})
};

const authStart = (state, action) => {
    return updatedObject(state, { error: null, loading: true});
};

const authSuccess = (state, action) => {
    return updatedObject(state, { 
        error: null,
        token: action.token,
        data: action.data,
        loading: false
    });
};

const authFail = (state, action) => {
    return updatedObject(state, { error: action.error, loading: false });
};

const authLogout = (state, action) => {
    return updatedObject(state, { 
        token: null, 
        data: null, 
        mobile_number: null
    });
};

const setAuthRedirectPath = (state, action) => {
    return updatedObject(state, {authRedirectPath: action.path});
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SIGNUP_START:
            return signUpStart(state, action);
        case actionTypes.SIGNUP_SUCCESS:
            return signUpSuccess(state, action);
        case actionTypes.SIGNUP_FAIL:
            return signUpFail(state, action);
        case actionTypes.AUTH_INIT_START:
            return authInitStart(state, action);
        case actionTypes.AUTH_INIT_SUCCESS:
            return authInitSuccess(state, action);
        case actionTypes.AUTH_INIT_FAIL:
            return authInitFail(state, action);
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action);
        default:
            return state;
    }
};

export default reducer;