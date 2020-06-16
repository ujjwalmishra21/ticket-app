import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Loader from '../../components/UI/Loader/Loader';
import * as actions from '../../store/actions/index';

class Home extends Component{
    state = {
        location_data: null
    }
    componentDidMount(){
        this.props.getLocation();
        
    }

    render(){
        let firstName = this.props.userData.name.split(' ')[0];
        let html = <h1>Welcome {firstName}</h1>;
        
        if(this.props.loading || this.props.locationLoad){
            html = <Loader />
        }
       
        return (
            <Aux>
                {html}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        userData: state.auth.data,
        loading: state.auth.loading,
        locationLoad: state.location.loading,
        locationData: state.location.location_data
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getLocation: () => dispatch(actions.fetchLocation())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);