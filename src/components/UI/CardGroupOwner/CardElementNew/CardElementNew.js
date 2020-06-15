import React from 'react';
import {Card, CardContent} from 'semantic-ui-react';

const CardElementNew = props => {
    let date = '';
    let open_time_s = props.open_time.split(':');
    let open_time = open_time_s[0] + ':' + open_time_s[1];

    let close_time_s = props.close_time.split(':');
    let close_time = close_time_s[0] + ':' + close_time_s[1];
    if(props.booking_date){
        let cur_date_time = new Date(props.booking_date);
        let day = cur_date_time.getDay() < 10 ? '0' + cur_date_time.getDay() : cur_date_time.getDay();
        let month =  (cur_date_time.getMonth()+1) < 10 ? '0' + (cur_date_time.getMonth()+1) : (cur_date_time.getMonth()+1);

        date = day + '/' + month + '/' + cur_date_time.getFullYear();
    }
 
    return (
        <Card>
            <Card.Content>
                <Card.Header>{props.store_name}</Card.Header>
                <Card.Meta>
                    Slot Date: {date}
                </Card.Meta>
                <Card.Meta>
                    Slot Time: {props.slot_details.description}
                </Card.Meta>
                <Card.Description>
                    Store Hours: {open_time} - {close_time}
                </Card.Description>
            </Card.Content>
            <CardContent extra>
                <Card.Description>
                    {props.locality}, {props.street}, {props.city}
                </Card.Description>
            </CardContent>
        </Card>
    );
};

export default CardElementNew;