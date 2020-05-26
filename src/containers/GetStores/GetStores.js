import React, { Component } from 'react';
import { connect } from  'react-redux';
import * as actions from '../../store/actions/index';

class GetStores extends Component{

    componentDidMount() {
        let data = [];
        data['city'] = 'Ghaziabad'
        this.props.fetchStores(this.props.token,data);
    }

    render(){
        return (
            <div>
                {this.props.stores}
            </div>
        );
    }


}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        stores: state.store.stores
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchStores: (token, params) => dispatch(actions.fetchStores(token, params))
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(GetStores);

