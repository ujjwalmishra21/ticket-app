import React, { Component } from 'react';
import { connect } from  'react-redux';
import Aux from '../../hoc/Aux/Aux';
import CardGroup from '../../components/UI/CardGroup/CardGroup';
import Loader from '../../components/UI/Loader/Loader';
import * as actions from '../../store/actions/index';

class GetStores extends Component{
    
    componentDidMount() {
        let data = [];
        data['owner_id'] = 1;
        this.props.fetchStores(this.props.token,data);
    }

    render(){
        let stores = [];
        this.props.stores.forEach(store => {
            stores.push(store);
        });

        let html = <CardGroup key='stores' stores={stores} />;
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
        loading: state.store.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchStores: (token, params) => dispatch(actions.fetchStores(token, params))
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(GetStores);

