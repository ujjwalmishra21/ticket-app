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
    return (dispatch) => {
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
            
                dispatch(fetchSlotsFail(err.message));
            });

    };
};

export const fetchSlotAvailabilitySuccess = (data) => {
    return {
        type: actionTypes.FETCH_SLOT_AVAILABILITY_SUCCESS,
        slot_available_data: data
    };
};

export const fetchSlotAvailabilityFail = (error) => {
    return {
        type: actionTypes.FETCH_SLOT_AVAILABILITY_FAIL,
        error: error
    };
};

export const fetchSlotAvailabilityStart = () => {
    return {
        type: actionTypes.FETCH_SLOT_AVAILABILITY_START
    };
};

export const fetchSlotAvailability = (token, data) => {
    return (dispatch) => {
        dispatch(fetchSlotAvailabilityStart());
        const config = {headers:{'x-auth': token}};
        const param = `?booking_date=${encodeURIComponent(data['booking_date'])}&store_id=${data['store_id']}`;
        axios.get(`/getBookingsCountForDate${param}`, config)
            .then(response => {
                
                if(response.data.status === 'success'){
                    dispatch(fetchSlotAvailabilitySuccess(response.data.data));
                }else{
                    dispatch(fetchSlotAvailabilityFail(response.message));
                }
            }).catch(err => {
                dispatch(fetchSlotAvailabilityFail(err.message));
            })


    };
};


