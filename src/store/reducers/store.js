import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../utility/utility';

const initialState = {
    stores: [],
    loading: false,
    error: null,
    response: null   
};

const addStoreStart = (state, action) => {
    return updatedObject(state, {
        error:null,
        loading: true
    });
};

const addStoreSuccess = (state, action) => {
    return updatedObject(state, {
        loading: false,
        response: action.response
    });
};

const addStoreFail = (state, action) => {
    return updatedObject(state, {
        loading: false,
        error: action.error
    })
};

const fetchStoresStart = (state,action) => {
    return updatedObject(state, {
        error:null,
        loading: true
    });
};

const fetchStoresSuccess = (state, action) => {
    return updatedObject(state, {
        stores: action.stores,
        loading: false
    });
};

const fetchStoresFail = (state, action) => {
    return updatedObject(state, {
        loading: false,
        error: action.error
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_STORES_START:
            return fetchStoresStart(state, action);
        case actionTypes.FETCH_STORES_SUCCESS:
            return fetchStoresSuccess(state, action);
        case actionTypes.FETCH_STORES_FAIL:
            return fetchStoresFail(state, action);
        case actionTypes.ADD_STORE_START:
            return addStoreStart(state, action);
        case actionTypes.ADD_STORE_SUCCESS:
            return addStoreSuccess(state, action);
        case actionTypes.ADD_STORE_FAIL:
            return addStoreFail(state, action);
        default:
            return state;
    }
};

export default reducer;