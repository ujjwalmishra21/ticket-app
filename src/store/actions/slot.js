import axios from '../../axios-order';
import * as actionTypes from './actionTypes';

export const fetchSlotsSuccess = (slots) => {
    return {
        type: actionTypes.FETCH_SLOTS_SUCCESS,
        slots: slots
    };
};

export const fetchSlotsFail = (error) => {
    return {
        type: actionTypes.FETCH_SLOTS_FAIL,
        error: error
    };
};

export const fetchSlotsStart = () => {
    return {
        type: actionTypes.FETCH_SLOTS_START
    };
};

export const fetchSlots = (token) => {
    return async (dispatch) => {
        dispatch(fetchSlotsStart());
        const config = {headers:{'x-auth': token}};

        axios.get('/getSlots', config)
            .then(response => {
                if(response.data.status == 'success'){
                    let data = [];
                    response.data.data.forEach(slot => {
                        data.push(slot);
                    });

                    dispatch(fetchSlotsSuccess(data));
                }else{
                    dispatch(fetchSlotsFail(response.data.message));
                }                
            }).catch(err => {
                console.log(err);
                dispatch(fetchSlotsFail(err.message));
            });

    };
};


