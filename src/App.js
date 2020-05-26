import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect, Link} from 'react-router-dom';
// import Signup from './containers/Signup/Signup';
import { connect } from 'react-redux';
import './App.css';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import * as action from './store/actions/index';

const asyncSignUp = asyncComponent(() => {
  return import('./containers/Signup/Signup');
})

const aysncLogin = asyncComponent(() => {
  return import('./containers/Login/Login');
})

const asyncOTP = asyncComponent(() => {
  return import ('./containers/OTP/OTP');
})

const asyncAddStore = asyncComponent(() => {
  return import ('./containers/AddStore/AddStore');
})

const asyncGetStores = asyncComponent(() => {
  return import ('./containers/GetStores/GetStores');
})

const asyncGetHome = asyncComponent(() => {
  return import ('./containers/Home/Home');
})

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoLogin();
  }

  render(){
    let route = (
      <Switch>
        <Route path="/otp" component={asyncOTP} />
        <Route path="/signup" component={asyncSignUp} />
        <Route path="/login" component={aysncLogin} />
        
        <Redirect to="/"/>
       </Switch>
    );
    if(this.props.isAuthenticated){
      console.log("HERE AUTH")
      // let type = localStorage.getItem(this.props.userData.type);
      // console.log(this.props.userData.type);
      // if(parseInt(type) === 1){
        console.log("HERE type 1")
        route = (
          <Switch>
            
            <Route path="/addStore" component={asyncAddStore} />
            <Route path="/getStore" component={asyncGetStores} />
            <Route path="/" exact component={asyncGetHome}/>
             
            <Redirect to="/"/>
          </Switch>
        );
      // }else if(parseInt(type) === 2){
      //   console.log("HERE")
      //   route = (
      //     <Switch>
            
      //       <Route path="/getStore" component={asyncGetStores} />
      //       <Route path="/" exact component={asyncGetHome} />
      //       <Redirect to="/"/>
      //     </Switch>
      //   );
      // }
      console.log(route);
    
      
    }

    return (
      <div className="App">
        <header className="App-header">
         
          {route}
          {/* <Link className="ui button" to="/signup">Signup</Link>
          <Link className="ui button" to="/login">Login</Link>
          <Link className="ui button" to="/otp">OTP</Link>
          <Link className="ui button" to="/addStore">Add Store</Link> */}
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    userData: state.auth.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(action.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
