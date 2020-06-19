import React from 'react';
import {Card, CardContent} from 'semantic-ui-react';
import './CardElementCustomer.css';

const CardElementNew = props => {
    let date = '';
    let open_time = '', close_time = '';
    
    if(props.store_details && props.store_details.open_time){
        let open_time_s = props.store_details.open_time.split(':');
        open_time = open_time_s[0] + ':' + open_time_s[1];
    }
    if(props.store_details && props.store_details.close_time){
        let close_time_s = props.store_details.close_time.split(':');
        close_time = close_time_s[0] + ':' + close_time_s[1];
    }
    if(props.booking_date){
        let cur_date_time = new Date(props.booking_date);
        let day = cur_date_time.getDay() < 10 ? '0' + cur_date_time.getDay() : cur_date_time.getDay();
        let month =  (cur_date_time.getMonth()+1) < 10 ? '0' + (cur_date_time.getMonth()+1) : (cur_date_time.getMonth()+1);

        date = day + '/' + month + '/' + cur_date_time.getFullYear();
    }
    let slot_description = '';
    if(props.slot_details && props.slot_details.description){
        slot_description = props.slot_details.description;
    }
    let store_name = '';
    if(props.store_details && props.store_details.store_name){
        store_name = props.store_details.store_name;
    }
    let store_address = '';
    if(props.store_details && props.store_details.locality && props.store_details.street && props.store_details.city){
        store_address = props.store_details.locality + ', ' + props.store_details.street + ', ' + props.store_details.city;
    }
    return (
        <Card className='booking-store-card'>
            <Card.Content className='bookings-top-section'>
                <Card.Header>{store_name}</Card.Header>
                <Card.Meta>
                    <div className='store-detail-section'>
                        <div>
                            Store Hours: {open_time} - {close_time}
                        </div>
                    </div>
                </Card.Meta>
                <Card.Description>
                    <div className='slot-section'>
                        Slot Date: {date}
                    </div>
                    <div className='slot-section'>
                        Slot Time: {slot_description}
                    </div>
                    
                </Card.Description>
              
            </Card.Content>
            <CardContent extra>
                <Card.Description>
                    <div className='address-section'>   
                        {store_address}
                    </div>
                </Card.Description>
            </CardContent>
        </Card>
    );
};

export default CardElementNew;