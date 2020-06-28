import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../utility/utility';

const initialState = {
    message: null,
    loading: false,
    error: null,
    booking: null,
    qr_code: null
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

const resetBookingProps = (state, action) => {
    return updatedObject(state, {
        error: null,
        message: null,
        loading: false
    })
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

const fetchQRCodeStart = (state, action) => {
    return updatedObject(state, {loading: true});
};

const fetchQRCodeSuccess = (state, action) => {
    return updatedObject(state, {
        loading: false,
        qr_code: action.qr_code
    });
};

const fetchQRCodeFail = (state, action) => {
    return updatedObject(state, {
        loading: false,
        message: action.message
    });
};


const completeBookingVerificationStart = (state, action) => {
    return updatedObject(state, {loading: true});
};

const completeBookingVerificationSuccess = (state, action) => {
    return updatedObject(state, {
        loading: false,
        message: action.message
    });
};

const completeBookingVerificationFail = (state, action) => {
    return updatedObject(state, {
        loading: false,
        message: action.message
    });
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
        case actionTypes.RESET_BOOKING_PROPS:
            return resetBookingProps(state, action);
        case actionTypes.FETCH_QR_CODE_START:
            return fetchQRCodeStart(state, action);
        case actionTypes.FETCH_QR_CODE_SUCCESS:
            return fetchQRCodeSuccess(state, action);
        case actionTypes.FETCH_QR_CODE_FAIL:
            return fetchQRCodeFail(state, action);
        case actionTypes.COMPLETE_BOOKING_VERIFICATION_START:
            return completeBookingVerificationStart(state, action);
        case actionTypes.COMPLETE_BOOKING_VERIFICATION_SUCCESS:
            return completeBookingVerificationSuccess(state, action);
        case actionTypes.COMPLETE_BOOKING_VERIFICATION_FAIL:
            return completeBookingVerificationFail(state, action);
        default:
            return state;
    };
};

export default reducer;


