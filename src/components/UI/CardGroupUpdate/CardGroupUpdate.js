import React from 'react';
import CardElementNew from './CardElementNew/CardElementNew';
import Aux from '../../../hoc/Aux/Aux';
import {connect} from 'react-redux';
import {Card} from 'semantic-ui-react';
import Loader from '../Loader/Loader';

const CardGroupUpdate = (props) => {
    let bookings = [];
    
    if(props.bookings.length > 0){
        props.bookings.forEach(booking => {
            booking.bookings.forEach(details => {
                bookings.push({
                    booking_details: details,
                    store_details: {
                        city: booking.city,
                        open_time: booking.open_time,
                        close_time: booking.close_time,
                        country: booking.country,
                        landmark: booking.landmark,
                        locality: booking.locality,
                        state: booking.state,
                        store_name: booking.store_name,
                        street: booking.street,
                        zip: booking.zip,
                        owner_id: booking.owner_id,
                    },
                    slot_details: details.slot
                });
            });
        });
      
        
    }
  
    var bookings_html = (
        <Card.Group style={{justifyContent: 'center'}}>
            {
                bookings.length > 0 && bookings.map(booking => {
                    return(
                        <CardElementNew
                            key={booking.booking_details.booking_id}
                            store_name={booking.store_details.store_name}
                            open_time={booking.store_details.open_time}
                            close_time={booking.store_details.close_time}
                            landmark={booking.store_details.landmark}
                            locality={booking.store_details.locality}
                            street={booking.store_details.street}
                            country={booking.store_details.country}
                            state={booking.store_details.state}
                            city={booking.store_details.city}
                            zip={booking.store_details.zip}
                            booking_date={booking.booking_details.booking_date}
                            customer_id={booking.booking_details.customer_id}
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

export default connect(mapStateToProps)(CardGroupUpdate);