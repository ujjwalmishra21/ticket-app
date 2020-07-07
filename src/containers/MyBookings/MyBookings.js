import React, {Component} from 'react';
import Loader from '../../components/UI/Loader/Loader';
import CardGroupOwner from '../../components/UI/CardGroupOwner/CardGroupOwner';
import CardGroupCustomer from '../../components/UI/CardGroupCustomer/CardGroupCustomer';
import {connect} from 'react-redux';
import Aux from '../../hoc/Aux/Aux';

import * as actions from '../../store/actions';


class MyBookings extends Component {
 
    componentDidMount(){
        this.props.onResetBookingProps();
        this.props.getBookings(this.props.token);
    }

    render(){
        let bookings = [];
        let html_alt = '';
        if(this.props.bookings && this.props.bookings.length > 0){
            this.props.bookings.forEach(booking =>{
                bookings.push(booking);
            });
        }else{
            html_alt = <h2>No bookings found</h2>
        }
        let heading = <h1>My Bookings</h1>;
        if(parseInt(this.props.data.type) === 1){
            heading = <h1>Store Bookings</h1>
        }
        let html = ''
        if(bookings.length > 0){
            if(parseInt(this.props.data.user_id) === 1)
                html = <CardGroupOwner bookings={bookings} />
            else
                html = <CardGroupCustomer bookings={bookings} />
        }else{
            html = html_alt
        }

        return (
            <Aux>
                {heading}
                {html}
            </Aux>
        );
    };
};

const mapStateToProps = state => {
    return{
        loading: state.booking.loading,
        bookings: state.booking.booking,
        error: state.booking.error,
        token: state.auth.token,
        data: state.auth.data
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getBookings: (token) => dispatch(actions.fetchBooking(token)),
        onResetBookingProps: () => dispatch(actions.resetBookingProps())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBookings);