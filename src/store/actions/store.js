import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addStoreSuccess = (response) => {
    return {
        type: actionTypes.ADD_STORE_SUCCESS,
        response: response
    };
};

export const addStoreFail = (error) => {
    return {
        type: actionTypes.ADD_STORE_FAIL,
        error: error
    };
};

export const addStoreStart = () => {
    return {
        type: actionTypes.ADD_STORE_START
    };
};

export const addStore = (token, data) => {
    return dispatch => {
        dispatch(addStoreStart());
       
        const config = {headers:{'x-auth': token}};
        
        axios.post('/addStore', data, config)
            .then(response => {

                if(response.data.status === 'success'){
                    dispatch(addStoreSuccess(response.data));
                }else{
                    dispatch(addStoreFail(response.data.message));
                }
                
            }).catch((err)=>{
               
                dispatch(addStoreFail(err.message));
            });
        
    };
};

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
     
        const config = {headers:{'x-auth': token}};
        
        axios.get('/getStores' + queryParams, config)
            .then(response => {

                if(response.data.status === 'success'){
                    let data = []; 
                    response.data.data.forEach(store => {
                        data.push(store);
                    })
                                       
                    dispatch(fetchStoresSuccess(data));
                }else{
                    dispatch(fetchStoresFail(response.data.message));
                }
                
            }).catch((err)=>{
             
                dispatch(fetchStoresFail(err.message));
            });
        

    };
};


