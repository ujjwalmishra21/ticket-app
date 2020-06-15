import axios from '../../axios-order';
import * as actionTypes from './actionTypes';

export const fetchLocationStart = () => {
    return {
        type: actionTypes.FETCH_LOCATION_START
    };
};

export const fetchLocationSuccess = (location) => {
    return {
        type: actionTypes.FETCH_LOCATION_SUCCESS,
        location: location
    };
};

export const fetchLocationFail = (error) => {
    return {
        type: actionTypes.FETCH_LOCATION_FAIL,
        error: error
    };
};

export const fetchLocation = (location) => {
    return dispatch => {
        dispatch(fetchLocationStart());
    };
};