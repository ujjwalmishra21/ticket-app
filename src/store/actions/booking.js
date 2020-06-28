import axios from '../../axios-order';
import * as actionTypes from './actionTypes';

export const createBookingStart = () => {
    return {
        type: actionTypes.CREATE_BOOKING_START
    };
};

export const createBookingFail = (error) => {
    return {
        type: actionTypes.CREATE_BOOKING_FAIL,
        error: error
    };   
};

export const createBookingSuccess = (message) => {
    return {
        type: actionTypes.CREATE_BOOKING_SUCCESS,
        message: message
    };
};

export const resetBookingProps = () => {
    return {
        type: actionTypes.RESET_BOOKING_PROPS
    };
};

export const createBooking = (token, data) => {
    return dispatch => {
        dispatch(createBookingStart());

        const config = { headers:{ 'x-auth': token}};

        axios.post('/createBooking', data, config)
            .then(response => {
               
                if(response.data.status === 'success')
                    dispatch(createBookingSuccess(response.data.message));
                else
                    dispatch(createBookingFail(response.data.message));
            }).catch(err => {
                dispatch(createBookingFail(err.message));
            });
    };
};

export const fetchBookingStart = () => {
    return {
        type: actionTypes.FETCH_BOOKING_START
    };
};

export const fetchBookingFail = (error) => {
    return {
        type: actionTypes.FETCH_BOOKING_FAIL,
        error: error
    };
};

export const fetchBookingSuccess = (booking) => {
    return {
        type: actionTypes.FETCH_BOOKING_SUCCESS,
        booking: booking
    };
};

export const fetchBooking = (token) => {
    return dispatch => {
        dispatch(fetchBookingStart());
        const user_data = JSON.parse(localStorage.getItem('data'));
        const config = { headers:{ 'x-auth': token}};
        let data = {
            type: user_data['type'],
            user_id: user_data['user_id']
        };
        let params = '';
        if(parseInt(data['type']) === 1){
            params = `owner_id=${data['user_id']}`;
        }else{
            params = `customer_id=${data['user_id']}`;
        }

        axios.get(`/getBooking?${params}`, config)
            .then(response => {
                if(response.data.status === 'success')
                    dispatch(fetchBookingSuccess(response.data.data));
                else
                    dispatch(fetchBookingFail(response.data.message));
            }).catch(err => {       
                dispatch(fetchBookingFail(err.message));
            });
    };
};

export const fetchQRCodeStart = () => {
    return {
        type: actionTypes.FETCH_QR_CODE_START
    };
};

export const fetchQRCodeSuccess = (data) => {
    return {
        type: actionTypes.FETCH_QR_CODE_SUCCESS,
        qr_code: data  
    };
};

export const fetchQRCodeFail = (error) => {
    return {
        type: actionTypes.FETCH_QR_CODE_FAIL,
        error: error
    };
};

export const fetchQRCode = (token, data) => {
    return dispatch => {
        dispatch(fetchQRCodeStart());

        const config = { headers: {'x-auth': token}};
       
        const param = `?booking_id=${data['booking_id']}`
        axios.get(`/getQRCode${param}`, config)
            .then(response => {
                if(response.data.status === 'success'){
                    dispatch(fetchQRCodeSuccess(response.data.data));
                }else{
                    dispatch(fetchQRCodeFail(response.data.message));
                }
            })
            .catch(err => {
                dispatch(fetchQRCodeFail(err.message));
            });
    };
};


export const completeBookingVerificationStart = () => {
    return {
        type: actionTypes.COMPLETE_BOOKING_VERIFICATION_START
    };
};

export const completeBookingVerificationSuccess = (message) => {
    return {
        type: actionTypes.COMPLETE_BOOKING_VERIFICATION_SUCCESS,
        message: message  
    };
};

export const completeBookingVerificationFail = (error) => {
    return {
        type: actionTypes.COMPLETE_BOOKING_VERIFICATION_FAIL,
        error: error
    };
};

export const completeBookingVerification = (token, data) => {
    return dispatch => {
        dispatch(fetchQRCodeStart());

        const config = { headers: {'x-auth': token}};

        axios.post('/completeBookingVerification', data, config)
            .then(response => {
                if(response.data.status === 'success'){
                    dispatch(fetchQRCodeSuccess(response.data.message));
                }else{
                    dispatch(fetchQRCodeFail(response.data.message));
                }
            })
            .catch(err => {
                dispatch(fetchQRCodeFail(err.message));
            });
    };
};