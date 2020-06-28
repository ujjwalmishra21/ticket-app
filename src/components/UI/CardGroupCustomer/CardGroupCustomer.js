import React, {Component} from 'react';
import CardElementCustomer from './CardElementCustomer/CardElementCustomer';
import Aux from '../../../hoc/Aux/Aux';
import {connect} from 'react-redux';

import {
    Card,
    Modal
} from 'semantic-ui-react';
import Loader from '../Loader/Loader';
import * as actions from '../../../store/actions/index';



class CardGroupCustomer extends Component {
    state={
        modal:false
    }
    fetchQR = async (booking_id) => {
        const data = {
            'booking_id': booking_id
        };
            this.props.fetchQRCode(this.props.token, data);
    
    }
    modalOpen = () => {
        this.setState({
            modal: true
        });
    }
    render(){
        let bookings = [];
        
        if(this.props.bookings && this.props.bookings.length > 0){
        
            this.props.bookings.forEach(booking => {
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
                                qr_code={this.props.qr_code}
                                fetchQR={() => this.fetchQR(booking.booking_id)}
                                modalOpen={this.modalOpen}
                            />
                        );
                    })
                }
            </Card.Group>
        );
        
        if(this.props.loading){
            bookings_html = <Loader />;
        }

        if(this.props.error){
            alert(this.props.error)
        }
        
        var modal = (
            <div onClick={()=>this.setState({modal:false})}>
            <Modal open={this.state.modal} basic size='small' >
           
            <Modal.Content >
            <div class='qr-code-modal-image-div' style={{textAlign:'center'}}>
              <img src={this.props.qr_code} alt='QR Code' className='qr-code-modal-image' style={{width:'70%'}}/> 
            </div>    
             
            </Modal.Content>
           
          </Modal>
          </div>
        )

        return (
        <Aux>
            {bookings_html}
            {modal}
        </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.booking.loading,
        error: state.booking.error,
        token: state.auth.token,
        qr_code: state.booking.qr_code
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchQRCode: (token, data) => dispatch(actions.fetchQRCode(token, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardGroupCustomer);