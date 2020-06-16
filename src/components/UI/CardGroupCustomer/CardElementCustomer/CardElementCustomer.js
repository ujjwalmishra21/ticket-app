import React from 'react';
import {Card, CardContent} from 'semantic-ui-react';

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
        store_address = props.store_details.locality + ',' + props.store_details.street + ',' + props.store_details.city;
    }
    return (
        <Card>
            <Card.Content>
                <Card.Header>{store_name}</Card.Header>
                <Card.Meta>
                    Slot Date: {date}
                </Card.Meta>
                <Card.Meta>
                    Slot Time: {slot_description}
                </Card.Meta>
                <Card.Description>
                    Store Hours: {open_time} - {close_time}
                </Card.Description>
            </Card.Content>
            <CardContent extra>
                <Card.Description>
                    {store_address}
                </Card.Description>
            </CardContent>
        </Card>
    );
};

export default CardElementNew;