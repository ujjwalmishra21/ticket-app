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
    }
}