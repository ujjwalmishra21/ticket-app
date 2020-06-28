import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../utility/utility';
import { fetchSlotAvailability } from '../actions';

const initialState = {
    slots: [],
    loading: false,
    error: null,
    slot_available_data: []
};

const fetchSlotsStart = (state, action) => {
    return updatedObject(state, { loading:true });
};

const fetchSlotsSuccess = (state, action) => {
    return updatedObject(state, {
        slots:action.slots,
        loading:false
    });
};

const fetchSlotsFail = (state, action) => {
    return updatedObject(state,  { loading:false });
};

const fetchSlotAvailabilityStart = (state, action) => {
    return updatedObject(state, { loading: true });
};

const fetchSlotAvailabilitySuccess = (state, action) => {
    return updatedObject(state, {
        loading: false,
        slot_available_data: action.slot_available_data
    });
};

const fetchSlotAvailabilityFail = (state, action) => {
    return updatedObject(state, {
        loading: false,
        error: action.error
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_SLOTS_START:
            return fetchSlotsStart(state, action);
        case actionTypes.FETCH_SLOTS_SUCCESS:
            return fetchSlotsSuccess(state, action);
        case actionTypes.FETCH_STORES_FAIL:
            return fetchSlotsFail(state, action);
        case actionTypes.FETCH_SLOT_AVAILABILITY_START:
            return fetchSlotAvailabilityStart(state, action);
        case actionTypes.FETCH_SLOT_AVAILABILITY_SUCCESS:
            return fetchSlotAvailabilitySuccess(state, action);
        case actionTypes.FETCH_SLOT_AVAILABILITY_FAIL:
            return fetchSlotAvailabilityFail(state, action);
        default:
            return state;
    };
};

export default reducer;

