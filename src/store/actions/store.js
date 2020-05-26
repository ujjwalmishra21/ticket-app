import * as actionTypes from './actionTypes';
import axios from '../../axios-order';


export const fetchStoresSuccess = (stores) => {
    return {
        type: actionTypes.FETCH_STORES_SUCCESS,
        stores: stores
    };
};

export const fetchStoresFail = (error) => {
    return {
        type: actionTypes.FETCH_STORES_FAIL,
        error: error
    };
};

export const fetchStoresStart = () => {
    return {
        type: actionTypes.FETCH_STORES_START
    };
};

export const fetchStores = (token, params) => {
    return async (dispatch) => {
        dispatch(fetchStoresStart());
        let queryParams = '';
        if(params['owner_id'])
            queryParams = `?owner_id=${params['owner_id']}`;
        else if(params['zip'])
            queryParams = `?zip=${params['zip']}`;
        else if(params['city'])
            queryParams = `?city=${params['city']}`
        
        const config = {headers: token};

        try{
            const response = await axios.get('/getStores' + queryParams, config);
            if(response.data.status === 'success'){
                console.log(response.data.message);
                dispatch(fetchStoresSuccess(response.data.data));
            }else{
                dispatch(fetchStoresFail(response.data.message));
            }
            
        }catch(err){
            dispatch(fetchStoresFail(err.message));
        }

    }
}


