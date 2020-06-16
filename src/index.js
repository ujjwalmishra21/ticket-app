import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

import 'semantic-ui-css/semantic.min.css'
import "react-datepicker/dist/react-datepicker.css";
import './index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

import storeReducer from './store/reducers/store';
import authReducer from './store/reducers/auth';
import slotReducer from './store/reducers/slot';
import bookingReducer from './store/reducers/booking';
import locationReducer from './store/reducers/location';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducers = combineReducers({
  store: storeReducer,
  auth: authReducer,
  slot: slotReducer,
  booking: bookingReducer,
  location: locationReducer
});

const store = createStore(rootReducers, composeEnhancers(
  applyMiddleware(thunk)
));


const app = ( <Provider store={store}>
                <BrowserRouter>
                 
                    <App />
                
                </BrowserRouter>
              </Provider>
          );

ReactDOM.render(app,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
