import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Input from '../../components/UI/Input/Input';
import Image from '../../components/UI/ImageComponent/ImageComponent';
import { Form, Button} from 'semantic-ui-react';
import {checkValidity, updatedObject} from '../../utility/utility';
import * as actions from '../../store/actions/index';

class Login extends Component{
    state = {
        loginForm:{
            mobile_number:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Enter mobile number'
                },
                value:'',
                validation:{
                    required:true,
                    isNumeric:true,
                    minLength:10,
                    maxLength:10
                },
                inputMode:'numeric',
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    }
    
    onSubmit = (event) => {
        event.preventDefault();
        this.props.onAuthInit(this.state.loginForm.mobile_number.value);
    }

    changeHandler = (event, inputIdentifier) => {

        const updatedFormElement = updatedObject( this.state.loginForm[inputIdentifier],{
            value: event.target.value,
            valid: checkValidity(event.target.value,  this.state.loginForm[inputIdentifier].validation),
            touched: true
        });

        const updatedForm = updatedObject(this.state.loginForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for(let inputIdentifier in updatedForm){
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            loginForm: updatedForm,
            formIsValid: formIsValid
        });
    }
    render(){

        let formElementAr = [];

        for(let key in this.state.loginForm){
            formElementAr.push({
                id: key,
                config: this.state.loginForm[key]
            })
        }
        let form = (
            <Form>
               { formElementAr.map((formEle) => {
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
                })
                 }
                 <Button disabled={this.props.loading} loading={this.props.loading} onClick={this.onSubmit} className="ui button" style={{backgroundColor:'#747679', color:'#FFFFFF'}}>Login</Button>
            </Form>
        );
        let redirectPath = null;
        if(this.props.mobile_number && !this.props.loading){
            redirectPath = (<Redirect to="/otp" />)
        }
        
        let imageClass = {
            padding: '20px',
            margin: '30px',
            backgroundColor: 'white'
        };

        return (
            <Aux>
                {redirectPath}
                <Image src='https://img.icons8.com/officel/80/000000/booking.png' size='small' circular='true' bordered='true' class={imageClass} />
                {form}
            </Aux>
        );
        
   
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        mobile_number: state.auth.mobile_number,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthInit: (mobile_number) => dispatch(actions.authInit(mobile_number))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);