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