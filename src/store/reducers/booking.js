import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../utility/utility';

const initialState = {
    message: null,
    loading: false,
    error: null,
    booking: null
};

const createBookingStart = (state, action) => {
    return updatedObject(state, { loading: true});
};

const createBookingSuccess = (state, action) => {
    return updatedObject(state, {
        message: action.message,
        loading: false
    });
};

const createBookingFail = (state, action) => {
    return updatedObject(state, { 
        loading: false,
        error: action.error
     });
};

const fetchBookingStart = (state, action) => {
    return updatedObject(state, {loading:true});
};

const fetchBookingSuccess = (state, action) => {
    return updatedObject(state, {
        loading: false,
        booking: action.booking
    });
};

const fetchBookingFail = (state, action) => {
    return updatedObject(state, {
        loading: false,
        error: action.error
    })
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.CREATE_BOOKING_START:
            return createBookingStart(state, action);
        case actionTypes.CREATE_BOOKING_SUCCESS:
            return createBookingSuccess(state, action);
        case actionTypes.CREATE_BOOKING_FAIL:
            return createBookingFail(state, action);
        case actionTypes.FETCH_BOOKING_START:
            return fetchBookingStart(state, action);
        case actionTypes.FETCH_BOOKING_SUCCESS:
            return fetchBookingSuccess(state, action);
        case actionTypes.FETCH_BOOKING_FAIL:
            return fetchBookingFail(state, action);
        default:
            return state;
    };
};

export default reducer;


