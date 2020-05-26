import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../utility/utility';

const initialState = {
    stores: [],
    loading: false,
    purchase: false
};

const fetchStoresStart = (state,action) => {
    return updatedObject(state, {loading: true});
};

const fetchStoresSuccess = (state, action) => {
 
    return updatedObject(state, {
        stores: action.stores,
        loading: false
    });
};

const fetchStoresFail = (state, action) => {
    return updatedObject(state, {loading: false});
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_STORES_START:
            return fetchStoresStart(state, action);
        case actionTypes.FETCH_STORES_SUCCESS:
            return fetchStoresSuccess(state, action);
        case actionTypes.FETCH_STORES_FAIL:
            return fetchStoresFail(state, action);
        default:
            return state;
    }
};

export default reducer;