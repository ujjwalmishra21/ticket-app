import React, {Component} from 'react';
import { Card, Image, Rating, Button, Modal, Segment } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import {connect} from 'react-redux';

import Aux from '../../../../hoc/Aux/Aux'; 
import Loader from '../../Loader/Loader';
import './CardElement.css';

import * as actions from '../../../../store/actions/index';

class CardElement extends Component{

    state = {
        showModal:false,
        data: null,
        booking_date: null,
        slot_id: null
    };
    
    onShowModal = () => {
        this.setState({showModal: true });
    };
    onCloseModal = () => {
        this.setState({showModal: false})
    };

    onDateChange = (date) => {
        console.log(date)
        this.setState({
            booking_date: date
        });
    }

    handleChange = (type, value) => {
        console.log(type);
        this.setState({
            [type]: value
        })
    }
    

    confirmSlotBook = (event) => {
        event.preventDefault();
        let data = {
            booking_date: this.state.booking_date,
            slot_id: this.state.slot_id.value,
            customer_id: this.props.userData.user_id,
            store_id: this.props.store_id
        };

        console.log(data);
        this.props.createBooking(this.props.token, data);
        this.resetModal();
        this.onCloseModal();
    }
    resetModal = () => {
        this.setState({
            booking_date: null,
            slot_id: null
        })
    }

    render(){
        // let data = {
        //     store_id:this.props.store_id,
        //     name:this.props.store_name,
        //     rating:this.props.rating,
        //     street:this.props.street,
        //     locality:this.props.locality,
        //     landmark:this.props.landmark,
        //     city:this.props.city,
        //     state:this.props.state,
        //     zip:this.props.zip,
        //     country:this.props.country,
        //     owner_id:this.props.owner_id,
        //     open_time:this.props.open_time,
        //     close_time:this.props.close_time,
        //     slots:[]
        // };
        
        let options = [];
        this.props.slots.forEach(slot => {
            if(slot.start_time>=this.props.open_time && slot.end_time<= this.props.close_time){
                options.push({
                    value: slot.slot_id,
                    label: slot.description
                });
            }
        });

        let html = (
            <Card>
            <Card.Content className='content'>
                <Image
                    floated='right'
                    size='mini'
                    src='https://img.icons8.com/wired/64/000000/online-store.png'
                    className='storeIcon'
                />
                <Card.Header>{this.props.name}</Card.Header>
                <Card.Meta><Rating maxRating={5} rating={this.props.rating} icon='star' /></Card.Meta>
                <Card.Description>{this.props.street}, {this.props.locality}, {this.props.city}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                    <div style={{float:'left'}}>
                        Time: <Card.Description>{this.props.open_time} - {this.props.close_time}</Card.Description>
                    </div>
                    <div style={{float:'right'}}>
                         <Modal size='mini' trigger={<Button primary onClick={this.onShowModal}>Book</Button>} open={this.state.showModal} onClose={this.onCloseModal}>
                            <Modal.Header>Pick A Slot</Modal.Header>
                            <Modal.Content>
                                <div className='datepicker-section'>
                                    <DatePicker 
                                        dateFormat='dd/MM/yyyy'
                                        className='datepicker' 
                                        selected={this.state.booking_date} 
                                        placeholderText="Select a date" 
                                        onChange={this.onDateChange} />
                                </div>
                                <Select 
                                    className='select'
                                    value={this.state.slot_id}
                                    onChange={(value) => this.handleChange('slot_id', value)}
                                    placeholder="Select a time slot" 
                                    options={options} />
                            </Modal.Content>
                            <Modal.Actions>
                                <Button negative onClick={this.onCloseModal}>Close</Button>
                                <Button
                                    positive
                                    icon='checkmark'
                                    labelPosition='right'
                                    content='Confirm'
                                    onClick={this.confirmSlotBook}
                                />
                            </Modal.Actions>
                        </Modal>  
                    </div>
                </Card.Content>
            </Card>
        )

        return (
            <Aux>
                {html}
                
            </Aux>
        )
    }    
}

const mapStateToProps = state => {
    return {
         
        userData: state.auth.data,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createBooking: (token, data) => dispatch(actions.createBooking(token, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardElement);