import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class Logout extends Component {
    
    componentDidMount(){
        this.props.onResetBookingProps();        
        this.props.logout();
    }

    render(){
        return <Redirect to="/" />;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()),
        onResetBookingProps: () => dispatch(actions.resetBookingProps())
    };
};

export default connect(null, mapDispatchToProps)(Logout);