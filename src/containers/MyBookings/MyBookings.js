import React, {Component} from 'react';
import Loader from '../../components/UI/Loader/Loader';
import CardGroupUpdate from '../../components/UI/CardGroupUpdate/CardGroupUpdate';
import {connect} from 'react-redux';
import Aux from '../../hoc/Aux/Aux';

import * as actions from '../../store/actions';


class MyBookings extends Component {
 
    componentDidMount(){
        this.props.getBookings(this.props.token);
    }

    render(){
        let bookings = [];
        
        if(this.props.bookings){
            this.props.bookings.forEach(booking =>{
                bookings.push(booking);
            });
            
        }
        let heading = <h1>My Bookings</h1>;
        if(parseInt(this.props.data.user_id) === 1){
            heading = <h1>Store Bookings</h1>
        }
        return (
            <Aux>
                {heading}
                <CardGroupUpdate bookings={bookings} />
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
        getBookings: (token) => dispatch(actions.fetchBooking(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBookings);