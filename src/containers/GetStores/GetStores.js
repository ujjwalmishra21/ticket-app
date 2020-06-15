import React, { Component } from 'react';
import { connect } from  'react-redux';
import Aux from '../../hoc/Aux/Aux';
import CardGroup from '../../components/UI/CardGroup/CardGroup';
import Loader from '../../components/UI/Loader/Loader';
import * as actions from '../../store/actions/index';

class GetStores extends Component{
    
    componentDidMount() {
        let data = [];
        let user_data = JSON.parse(localStorage.getItem('data'));
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
          });
        if(parseInt(user_data.type) === 1){
            data['owner_id'] = user_data.user_id;
        }else if(parseInt(user_data.type) === 1){ 
            data['customer_id'] = user_data.user_id;
        }
       
        this.props.fetchStores(this.props.token,data);
        this.props.fetchSlots(this.props.token);
    }

    render(){
        let stores = [];
        let slots = [];
        this.props.stores.forEach(store => {
            stores.push(store);
        });
        this.props.slots.forEach(slot => {
            slots.push(slot);
        });
       
        let html = <CardGroup key='stores' stores={stores} slots={slots} />;
        if(this.props.loading){
            html = <Loader />
        }
        return (
            <Aux>
                <h1>Stores</h1>
                {html}
            </Aux>
        );
    }


}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        stores: state.store.stores,
        loading: state.store.loading,
        slots: state.slot.slots
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchStores: (token, params) => dispatch(actions.fetchStores(token, params)),
        fetchSlots: (token) => dispatch(actions.fetchSlots(token))
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(GetStores);

