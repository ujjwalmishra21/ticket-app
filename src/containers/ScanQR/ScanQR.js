import React, {Component} from 'react';
import QRReader from 'react-qr-reader';
import {connect} from 'react-redux';
import './ScanQR.css';
import Aux from '../../hoc/Aux/Aux';
import * as actions from '../../store/actions/index';
import Loader from '../../components/UI/Loader/Loader';

class ScanQR extends Component{
    state = {
        data: null,
        message: null
    }

    handleScan = (data) => {
        
        if (data) {
          this.setState({
            data: data
          });
          this.props.completeBookingVerification(this.props.token, {qr_data: this.state.data});
          this.setState({
              message: this.props.message
          });
        }
    }
    handleError = err => {
        console.error(err)
    }
    render(){

        let html = (
            <div className='qr-reader-section'>
                <QRReader 
                    delay={300}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{width:'100%', height:'100%'}}
                    />
            </div>
            )
        let message = null;
        let error = null;
        console.log("MESSAGE-----------------------" + this.props.message);
        if(this.state.message){
           
            message = (
                <div className='qr-reader-text-section'>
                    {this.state.message}
                </div>
            );
        }else{
            message = (
                <div className='qr-reader-text-section'>
                    Nothing Found
                </div>
            );
        }
        if(this.props.error){
            message = (
                <div className='qr-reader-text-section'>
                    {this.props.error}
                </div>
            );
        }

        return (
            <Aux>
               {html}
               {message}
               {error}
            </Aux>
        )

        
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        message: state.booking.message,
        error: state.booking.error,
        loading: state.booking.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        completeBookingVerification: (token, data) => dispatch(actions.completeBookingVerification(token, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScanQR);