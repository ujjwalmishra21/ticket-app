import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../utility/utility';

const initialState = {
    loading: false,
    error: null,
    location_data:null
};

const fetchLocationStart = (state, action) => {
    return updatedObject(state, {loading: true});
};

const fetchLocationSuccess = (state, action) => {
    return updatedObject(state, {
        loading: false,
        location_data: action.location_data
    });
};

const fetchLocationFail = (state, action) => {
    return updatedObject(state, {
        loading: false,
        error: action.error
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_LOCATION_START:
            return fetchLocationStart(state, action);
        case actionTypes.FETCH_LOCATION_SUCCESS:
            return fetchLocationSuccess(state, action);
        case actionTypes.FETCH_LOCATION_FAIL:
            return fetchLocationFail(state, action);
        default:
            return state; 
    };
};

export default reducer;

