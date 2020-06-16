import axios from '../../axios-order';
import * as actionTypes from './actionTypes';

export const fetchLocationStart = () => {
    return {
        type: actionTypes.FETCH_LOCATION_START
    };
};

export const fetchLocationSuccess = (location_data) => {
    
    return {
        type: actionTypes.FETCH_LOCATION_SUCCESS,
        location_data: location_data
    };
};

export const fetchLocationFail = (error) => {
    return {
        type: actionTypes.FETCH_LOCATION_FAIL,
        error: error
    };
};

export const fetchLocation = () => {
    return dispatch => {
        dispatch(fetchLocationStart());
       
            navigator.geolocation.getCurrentPosition(function(position) {
               
                let data = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                axios.get(`https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=${data.latitude}%2C${data.longitude}%2C250&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=M_ulbe3M9PhYpDH5tZD7Y9TLxjrzTH4J9c9eSWt_3hE`)
                .then(response => {
                    dispatch(fetchLocationSuccess(response.data.Response.View[0].Result[0].Location.Address));
                }).catch(err => {
                    dispatch(fetchLocationFail(err.message));
                });
            });
      
    };
};