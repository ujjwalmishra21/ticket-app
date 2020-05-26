import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Loader from '../../components/UI/Loader/Loader';

class Home extends Component{
   
    render(){
        let firstName = this.props.userData.name.split(' ')[0];
        let html = <h1>Welcome {firstName}</h1>;
        if(this.props.loading){
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
        loading: state.auth.loading
    };
};


export default connect(mapStateToProps)(Home);