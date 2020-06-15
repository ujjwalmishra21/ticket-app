import React from 'react';
import CardElementCustomer from './CardElementCustomer/CardElementCustomer';
import Aux from '../../../hoc/Aux/Aux';
import {connect} from 'react-redux';
import {Card} from 'semantic-ui-react';
import Loader from '../Loader/Loader';

const CardGroupCustomer = (props) => {
    let bookings = [];
    
    if(props.bookings && props.bookings.length > 0){
      
        props.bookings.forEach(booking => {
            bookings.push({
                booking_id: booking.booking_id,
                booking_date: booking.booking_date,
                store_details: booking.store,
                slot_details: booking.slot

            });
            
        });
      
          
    }
  
    var bookings_html = (
        <Card.Group style={{justifyContent: 'center', width: '100%'}}>
            {
                bookings.length > 0 && bookings.map(booking => {
                    return(
                        <CardElementCustomer
                            key={booking.booking_id}
                            booking_id={booking.booking_id}
                            booking_date={booking.booking_date}
                            store_details={booking.store_details}
                            slot_details={booking.slot_details}
                        />
                    );
                })
            }
        </Card.Group>
    );
    
    if(props.loading){
        bookings_html = <Loader />;
    }

    if(props.error){
        alert(props.error)
    }
    

    return (
       <Aux>
           {bookings_html}
       </Aux>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.booking.loading,
        error: state.booking.error
    };
};

export default connect(mapStateToProps)(CardGroupCustomer);