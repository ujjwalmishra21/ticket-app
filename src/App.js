import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect, Link} from 'react-router-dom';
// import Signup from './containers/Signup/Signup';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react';
import './App.css';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import NavItems from './components/UI/NavItems/NavItems';
import * as action from './store/actions/index';
import NavItem from './components/UI/NavItems/NavItem/NavItem';

const asyncSignUp = asyncComponent(() => {
  return import('./containers/Signup/Signup');
});

const aysncLogin = asyncComponent(() => {
  return import('./containers/Login/Login');
});

const asyncOTP = asyncComponent(() => {
  return import ('./containers/OTP/OTP');
});

const asyncAddStore = asyncComponent(() => {
  return import ('./containers/AddStore/AddStore');
});

const asyncGetStores = asyncComponent(() => {
  return import ('./containers/GetStores/GetStores');
});

const asyncMyBookings = asyncComponent(() => {
  return import ('./containers/MyBookings/MyBookings');
});

const asyncGetHome = asyncComponent(() => {
  return import ('./containers/Home/Home');
});

const asyncScanAndComplete = asyncComponent(() => {
  return import ('./containers/ScanQR/ScanQR');
});

const asyncLogout = asyncComponent(() => {
  return import ('./containers/Logout/Logout');
})



class App extends Component {

  componentDidMount() {
    this.props.onTryAutoLogin();
  }

  render(){
    let navList = [
      {
        name:'Login',
        path:'/login'
      }, 
      {
        name:'Signup',
        path:'/signup'
      }];

    let route = (
      <Switch>
        <Route path="/otp" component={asyncOTP} />
        <Route path="/signup" component={asyncSignUp} />
        <Route path="/login" component={aysncLogin} />
        
        <Redirect to="/"/>
       </Switch>
    );
    if(this.props.isAuthenticated){
      
      let addStore = null;

      if(parseInt(this.props.userData.type) === 1){
        
        navList = [
          {name:'Home', path:'/'},
          {name:'Add Store', path:'/addStore'},
          {name:'Get Store', path:'/getStore'},
          {name:'Store Bookings', path:'/myBookings'},
          {name:'Scan & Complete', path:'/scanAndComplete'},
          {name: 'Logout', path:'/logout'},
        ];
        addStore = <Route path="/addStore" component={asyncAddStore} /> ;
        
      }else{
        navList = [
          {name:'Home', path:'/'},
          {name:'Get Store', path:'/getStore'},
          {name:'My Bookings', path:'/myBookings'},
          {name: 'Logout', path:'/logout'},
        ];
      }
      
      route = (
        <Switch>
            {addStore}
            <Route path="/getStore" component={asyncGetStores} />
            <Route path="/myBookings" component={asyncMyBookings} />
            <Route path="/scanAndComplete" component={asyncScanAndComplete} />
            <Route path="/logout" component={asyncLogout} />
            <Route path="/" exact component={asyncGetHome}/>
            <Redirect to="/"/>
          </Switch>
      );
     
    
      
    }

    return (
      <div className="App">
       
          {/* <div className="Navbar"> */}
            <NavItems navList={navList}>
            <header className="App-header">
              
            {route}
            </header>
            </NavItems>
          {/* </div> */}
        
         
         
          {/* <Link className="ui button" to="/signup">Signup</Link>
          <Link className="ui button" to="/login">Login</Link>
          <Link className="ui button" to="/otp">OTP</Link>
          <Link className="ui button" to="/addStore">Add Store</Link> */}
       
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
