import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Form, Button} from 'semantic-ui-react';
import Select from 'react-select';
import {Redirect} from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Loader from '../../components/UI/Loader/Loader';
import './AddStore.css'
import Aux from '../../hoc/Aux/Aux';
import * as actions from '../../store/actions/index';
import { checkValidity, updatedObject } from '../../utility/utility';

class AddStore extends Component{
    state={
        addStoreForm:{
            store_name:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your store name'
                },
                value:'',
                validation:{
                    required: true
                },
                inputMode:'text',
                valid: false,
                touched: false
            },
            street:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your street'
                },
                value: '',
                validation:{
                    required: true
                },
                inputMode:'text',
                valid: false,
                touched: false
            },
            locality:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your locality'
                },
                value: '',
                validation: {
                    required: 'text',
                },
                valid: false,
                touched: false
            },
            landmark:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your landmark'
                },
                value: '',
                validation: {},
                inputMode:'text',
                valid: false,
                touched: false
            },
            city:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your city'
                },
                value: '',
                validation: {
                    required: 'text',
                },
                inputMode:'text',
                valid: false,
                touched: false
            },
            state:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your state'
                },
                value: '',
                validation: {
                    required: 'text',
                },
                inputMode:'text',
                valid: false,
                touched: false
                
            },
            country:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your country'
                },
                value: '',
                validation: {
                    required: 'text',
                },
                inputMode:'text',
                valid: false,
                touched: false

            },
            zip:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your zip code'
                },
                value: '',
                validation: {
                    required: 'text',
                    isNumeric: true,
                    minLength: 6,
                    maxLength: 6
                },
                inputMode:'numeric',
                valid: false,
                touched: false

            }
        },
        open_time: null,
        close_time: null,
        formIsValid: false,
        submit: false
    };
    componentDidMount(){
     
        this.props.onfetchSlots(this.props.token);
    }
    handleChange = (type, value) =>{
        
        this.setState({ 
            [type]: value
        });
        
    };
    onSubmit = (event) => {
        event.preventDefault();
        let data = {};

        for(let field in this.state.addStoreForm){
            data[field] = this.state.addStoreForm[field].value;
        }
        data['is_active'] = 0;
        data['owner_id'] = this.props.userData.user_id;
        data['open_time'] = this.state.open_time.value;
        data['close_time'] = this.state.close_time.value;
       
        this.props.onAddStore(this.props.token, data);
       
    };
    changeHandler = (event, inputIdentifier) => {
        
        const updatedFormElement= updatedObject(this.state.addStoreForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.addStoreForm[inputIdentifier].validation),
            touched: true
        });

        const updatedForm = updatedObject(this.state.addStoreForm,{
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for(let inputIdentifier in updatedForm){
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            addStoreForm: updatedForm,
            formIsValid: formIsValid
        })

    };

    render(){

        let formElementAr = [];

        for(let key in this.state.addStoreForm){
            formElementAr.push({
                id: key,
                config: this.state.addStoreForm[key]
            });
        }
        
        let time_options = [];
                
        this.props.slots.forEach(slot => {
            time_options.push({
                value: slot.start_time,
                label: slot.start_time
            });
        });

        var form = (
            <Form>
                {
                    formElementAr.map((formEle) => {
                        return (
                            <Input
                                key={formEle.id}
                                elementType={formEle.config.elementType}
                                elementConfig={formEle.config.elementConfig}
                                value={formEle.config.value}
                                invalid={!formEle.config.valid}
                                shouldValidate={formEle.config.validation}
                                touched={formEle.config.touched}
                                inputMode={formEle.config.inputMode}
                                changed={(event)=> this.changeHandler(event, formEle.id)}
                            />
                        );

                    })
                }
                <Select 
                    className='select'
                    value={this.state.open_time}
                    onChange={(value) => this.handleChange('open_time', value)}
                    placeholder='Opening Time'
                    options={time_options}
                    />
                <Select
                    className='select'
                    value={this.state.close_time}
                    onChange={(value) => this.handleChange('close_time',  value)}
                    placeholder='Closing Time'
                    options={time_options}
                    /> 

                <Button onClick={this.onSubmit}>Add Store</Button>
            </Form>
        );
        var error = <p style={{color:'red'}}>{this.props.error}</p>
        if(this.props.loading){
            form = <Loader />
        }
        if(this.props.response &&this.props.response.status === 'success'){
            let message = 'Your request submitted successfully. We will let you know once your request is confirmed.'; 
            alert(message);
        }        
        return (
            <Aux>
                <h1>Add store</h1>
                {form}
                {error}
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userData: state.auth.data,
        response: state.store.response,
        error: state.store.error,
        loading: state.store.loading,
        slots: state.slot.slots
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAddStore: (token,data) => dispatch(actions.addStore(token,data)),
        onfetchSlots: (token) => dispatch(actions.fetchSlots(token))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStore);