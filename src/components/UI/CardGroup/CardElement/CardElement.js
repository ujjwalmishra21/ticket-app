import React from 'react';
import { Card, Image, Rating} from 'semantic-ui-react';
import Aux from '../../../../hoc/Aux/Aux'; 
import './CardElement.css';
const CardElement = props => {
    
    return (
        <Aux>
            <Card>
            <Card.Content className='content'>
                <Image
                    floated='right'
                    size='mini'
                    src='https://img.icons8.com/wired/64/000000/online-store.png'
                    className='storeIcon'
                />
                <Card.Header>{props.name}</Card.Header>
                <Card.Meta><Rating maxRating={5} defaultRating={2} rating={props.rating} icon='star' /></Card.Meta>
                <Card.Description>{props.street}, {props.locality}, {props.city}</Card.Description>
            </Card.Content>
      <Card.Content extra>
        
      </Card.Content>
      </Card>
        </Aux>
    )

}

export default CardElement;