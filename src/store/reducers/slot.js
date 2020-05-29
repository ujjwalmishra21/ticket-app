import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../utility/utility';

const initialState = {
    slots: [],
    loading: false
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

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_SLOTS_START:
            return fetchSlotsStart(state, action);
        case actionTypes.FETCH_SLOTS_SUCCESS:
            return fetchSlotsSuccess(state, action);
        case actionTypes.FETCH_STORES_FAIL:
            return fetchSlotsFail(state, action);
        default:
            return state;
    }
};

export default reducer;

