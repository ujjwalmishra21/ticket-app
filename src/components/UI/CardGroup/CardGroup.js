import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../../hoc/Aux/Aux';
import { Card } from 'semantic-ui-react';

import CardElement from './CardElement/CardElement';
const CardGroup = props => {
    let stores = [];
    let slots = [];
    props.stores.forEach(store => {
        stores.push(store);
    });
    props.slots.forEach(slot => {
        slots.push(slot);
    });
    
    var stores_html = (
        <Card.Group style={{justifyContent:'center'}}>    
            {
                stores.map(store => {
                    let landmark = store.landmark ? store.landmark : '';
                    let rating = store.rating ? store.rating : 2.5 ;
                    let open_time = store.open_time.split(':');
                    open_time = open_time[0] + ':' + open_time[1];
                    let  close_time = store.close_time.split(':');
                    close_time = close_time[0] + ':' + close_time[1];
                    return (
                    <CardElement 
                        key={store.id}
                        src={store.src}
                        store_id={store.store_id}
                        name={store.store_name}
                        rating={rating}
                        street={store.street}
                        locality={store.locality}
                        landmark={landmark}
                        city={store.city}
                        state={store.state}
                        zip={store.zip}
                        country={store.country}
                        owner_id={store.owner_id}
                        open_time={open_time}
                        close_time={close_time}
                        slots={slots}
                    />
                    );
                })  
            }
        </Card.Group>
    )
    return (
        <Aux>
        {stores_html}
        </Aux>
    )

}
 
// {
//     "store_id": 2,
//     "store_name": "More Department Stores",
//     "street": "Gyan Khand 2",
//     "locality": "Indirapuram",
//     "landmark": null,
//     "city": "Ghaziabad",
//     "state": "Uttar Pradesh",
//     "country": "India",
//     "zip": 201010,
//     "created_at": "2020-05-16T13:27:49.000Z",
//     "updated_at": "2020-05-16T13:27:49.000Z",
//     "owner_id": 1
//   }


export default CardGroup;