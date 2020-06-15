import axios from '../../axios-order';
import * as actionTypes from './actionTypes';

export const signUpStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    };
};

export const signUpSuccess = () => {
    return {
        type: actionTypes.SIGNUP_SUCCESS
    };
};

export const signUpFail = (error) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        error: error
    };
};

export const signUp = (data) => {
    return dispatch => {
        dispatch(signUpStart());

        axios.post('/signup', data)
            .then(response => {
                if(response.data.status === 'success')
                    dispatch(signUpSuccess());
                else    
                    dispatch(signUpFail(response.data.message));
            }).catch(err => {
                dispatch(signUpFail(err.message));
            });
    };
};

export const authInitStart = () => {
    return {
        type: actionTypes.AUTH_INIT_START
    };
};
export const authInitSuccess = (mobile_number) => {
    return {
        type: actionTypes.AUTH_INIT_SUCCESS,
        mobile_number: mobile_number
    };
};

export const authInitFail = (error) => {
    return {
        type: actionTypes.AUTH_INIT_FAIL,
        error: error
    };
};

export const authInit = (mobile_number) => {
    return dispatch => {
        dispatch(authInitStart());
        
        const data = {
            mobile_number: mobile_number
        }
        axios.post('/login', data)
            .then(response => {
                if(response.data.status === 'success')
                    dispatch(authInitSuccess(mobile_number));
                else
                    dispatch(authInitFail(response.data.message));
            }).catch(err => {
                dispatch(authInitFail(err));
            })
    };
};


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        data: data

    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('data');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 100000);
    };
};

export const auth = (mobile_number, otp) => {
    return dispatch => {
        dispatch(authStart());
        const data = {
            mobile_number: mobile_number,
            otp: otp
        };
        
        axios.post('/login/verify-otp', data)
            .then(response => {
                if(response.data.status === 'success'){
                    const expirationDate = new Date(new Date().getTime() + 3600000);
                    const params = {
                        'x-auth': response.headers['x-auth'],
                        'expirationDate': expirationDate
                    };
                    
                    localStorage.setItem('token', params['x-auth']);
                    localStorage.setItem('expirationDate', params['expirationDate']);
                    localStorage.setItem('data', JSON.stringify(response.data.data));
                    dispatch(authSuccess(params['x-auth'], response.data.data));
                    dispatch(checkAuthTimeout(3600));
                }else{
                    dispatch(authFail(response.data.message));
                }
            }).catch(err => {
                dispatch(authFail(err.message));
            });

    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
       
        if(!token){
            dispatch(logout());
        }else{  
            const expiryDate = new Date(localStorage.getItem('expirationDate'));
            const data = localStorage.getItem('data');
            if(expiryDate <= new Date()){
                dispatch(logout());
            }else{
                // const userId = localStorage.getItem('daya');
                dispatch(authSuccess(token, JSON.parse(data)));
                dispatch(checkAuthTimeout((expiryDate.getTime() - new Date().getTime())/1000));
            }

        }
    };
};
