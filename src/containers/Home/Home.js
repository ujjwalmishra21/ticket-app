import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';

class Home extends Component{
   
    render(){
        return (
            <Aux>
                <h1>Welcome User</h1>
            </Aux>
        )
    }
}

export default Home;