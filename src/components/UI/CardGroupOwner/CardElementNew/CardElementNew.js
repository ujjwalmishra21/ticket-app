import React from 'react';
import './CardElementNew.css';
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
        <Card className='bookings-done-card'>
            <Card.Content className="bookings-top-section">
                <Card.Header className="store-name">{props.store_name}</Card.Header>
                <Card.Meta>
                    <div className="store-section">
                        <div className="store-section-left">
                             Store Hours: {open_time} - {close_time}
                        </div>
                        <div className="store-section-right">
                            {props.street}, {props.locality}
                        </div>
                    </div>
                </Card.Meta>
               
                <Card.Description >
                    <div className="slot-section">
                        Slot Date: {date}
                    </div>
                    <div className="slot-section">
                        Slot Time: {props.slot_details.description}
                    </div>
                </Card.Description>
            </Card.Content>
            <CardContent extra>
                <Card.Description>
                    <div className="user-section">
                        <div className="user-section-left">
                            Name: {props.user_details.name}
                        </div>
                        <div className="user-section-right">
                            Contact: {props.user_details.mobile_number}
                        </div>
                    </div>
                </Card.Description>
            </CardContent>
        </Card>
    );
};

export default CardElementNew;