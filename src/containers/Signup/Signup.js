import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';

import Aux from '../../hoc/Aux/Aux';
import Input  from '../../components/UI/Input/Input';
import Image from '../../components/UI/ImageComponent/ImageComponent';
import Loader from '../../components/UI/Loader/Loader';

import { updatedObject, checkValidity } from '../../utility/utility';
import * as actions from '../../store/actions/index';

class Signup extends Component {
    state={
        signUpForm:{
            type:{
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 1, text: 'Customer'},
                        {value: 2, text: 'Owner'}
                    ]
                },
                inputMode: 'none',
                value: 1,
                validation: {},
                valid: true
            },
            name:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your name'
                },
                value:'',
                validation:{
                    required: true
                },
                inputMode:'text',
                valid: false,
                touched: false
            },
            mobile_number:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Enter mobile number'
                },
                value:'',
                validation:{
                    required: true,
                    isNumeric: true,
                    minLength: 10,
                    maxLength: 10
                },
                inputMode:'numeric',
                valid: false,
                touched: false
            }
        },
        completed: false
    }
    submitHandler = (event) => {
        event.preventDefault();
        let data = {};
        for(let field in this.state.signUpForm){
            data[field] = this.state.signUpForm[field].value;
        }
        this.props.onSignUp(data);
        if(!this.props.error)
            this.setState({ completed: true });
        

    }
    changeHandler = (event, inputIdentifier) => {

        const updatedFormElement = updatedObject( this.state.signUpForm[inputIdentifier],{
            value: event.target.value,
            valid: checkValidity(event.target.value,  this.state.signUpForm[inputIdentifier].validation),
            touched: true
        });

        const updatedForm = updatedObject(this.state.signUpForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for(let inputIdentifier in updatedForm){
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            signUpForm: updatedForm,
            formIsValid: formIsValid
        });
    }

    render(){
        let formElementAr = [];
        for(let key in this.state.signUpForm){
            formElementAr.push({
                id: key,
                config: this.state.signUpForm[key] 
            });
        }
        
        let form = (
            <Form>
                { formElementAr.map(formEle => {
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
                            changed={(event) => this.changeHandler(event, formEle.id)}
                                 
                        />
                        
                    );
                })}
                <Button onClick={this.submitHandler} content='Submit' />
            </Form>
        );

        let imageClass = {
            padding: '20px',
            margin: '30px',
            backgroundColor: 'white'
        };
        let error = null;
        if(this.props.error){
            error = <p style={{color:'red'}}>{this.props.error}</p>
        }
        if(this.props.loading){
            form = <Loader />
        }
        if(this.state.completed){
            alert('User successfully registered. Please Login to continue');
            form = <Redirect to="/login" />
        }

        return(
           <Aux>
                <Image src='https://img.icons8.com/officel/80/000000/booking.png' size='small' circular={true} bordered={true} class={imageClass} />
                {form}
                {error}
           </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: (data) => dispatch(actions.signUp(data))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Signup);